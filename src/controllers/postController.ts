import { Request, Response } from 'express';
import pool from '../db';

export const createPost = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).userId;
  const { title, body } = req.body;

  if (!title || !body) {
    res.status(400).json({ error: 'Title and body are required' });
    return;
  }

  try {
    const result = await pool.query(
      'INSERT INTO posts (title, body, author_id) VALUES ($1, $2, $3) RETURNING *',
      [title, body, userId]
    );
    res.status(201).json({ message: 'Post created', post: result.rows[0] });
  } catch (err) {
    console.error('Create Post Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query(
      `SELECT posts.*, users.username FROM posts
       JOIN users ON posts.author_id = users.id
       ORDER BY posts.created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Get Posts Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getPostById = async (req: Request, res: Response): Promise<void> => {
  const postId = req.params.id;

  try {
    const result = await pool.query('SELECT * FROM posts WHERE id = $1', [postId]);

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error('Get Post Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updatePost = async (req: Request, res: Response): Promise<void> => {
  const postId = req.params.id;
  const userId = (req as any).userId;
  const { title, body } = req.body;

  try {
    const post = await pool.query('SELECT * FROM posts WHERE id = $1', [postId]);

    if (post.rowCount === 0) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    if (post.rows[0].author_id !== userId) {
      res.status(403).json({ error: 'You are not the owner of this post' });
      return;
    }

    const updated = await pool.query(
      'UPDATE posts SET title = $1, body = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
      [title, body, postId]
    );

    res.json({ message: 'Post updated', post: updated.rows[0] });
  } catch (err) {
    console.error('Update Post Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
  const postId = req.params.id;
  const userId = (req as any).userId;

  try {
    const post = await pool.query('SELECT * FROM posts WHERE id = $1', [postId]);

    if (post.rowCount === 0) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    if (post.rows[0].author_id !== userId) {
      res.status(403).json({ error: 'You are not the owner of this post' });
      return;
    }

    await pool.query('DELETE FROM posts WHERE id = $1', [postId]);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    console.error('Delete Post Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
