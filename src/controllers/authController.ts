import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

// 🔹 REGISTER
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, hashedPassword]
    );

    const user = result.rows[0];

    // ✅ Generate token after registration
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: 'User registered',
      user,
      token
    });
  } catch (err: any) {
    console.error('Register Error:', err);
    if (err.code === '23505') {
      res.status(400).json({ error: 'Username or email already exists' });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
};

// 🔹 LOGIN
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rowCount === 0) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: 'Login successful',
      token
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// 🔹 GET PROFILE
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).userId;

  try {
    const result = await pool.query('SELECT id, username, email FROM users WHERE id = $1', [userId]);

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error('Profile Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
