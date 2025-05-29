import pool from '../db';
import { Post } from '../types/posttype';

// ✅ Create a post
export const createPost = async (title: string, body: string, authorId: number): Promise<Post> => {
  const result = await pool.query(
    'INSERT INTO posts (title, body, author_id) VALUES ($1, $2, $3) RETURNING *',
    [title, body, authorId]
  );
  return result.rows[0];
};

export const getAllPosts = async (): Promise<Post[]> => {
  const result = await pool.query(`
    SELECT posts.*, users.username 
    FROM posts 
    JOIN users ON posts.author_id = users.id 
    ORDER BY posts.created_at DESC
  `);
  return result.rows;
};


export const getPostById = async (id: number): Promise<Post | null> => {
  const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  return result.rows.length > 0 ? result.rows[0] : null;
};


export const updatePost = async (id: number, title: string, body: string): Promise<Post> => {
  const result = await pool.query(
    'UPDATE posts SET title = $1, body = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
    [title, body, id]
  );
  return result.rows[0];
};


export const deletePost = async (id: number): Promise<void> => {
  await pool.query('DELETE FROM posts WHERE id = $1', [id]);
};


export const isOwner = async (postId: number, userId: number): Promise<boolean> => {
  const result = await pool.query('SELECT * FROM posts WHERE id = $1', [postId]);
  return result.rows.length > 0 && result.rows[0].author_id === userId;
};
