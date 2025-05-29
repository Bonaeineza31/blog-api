import pool from '../db';
import { AppError } from '../utils/errors';

export const fetchAllUsers = async () => {
  const result = await pool.query('SELECT id, username, email, role FROM users ORDER BY id ASC');
  return result.rows;
};

export const fetchUserById = async (userId: number) => {
  const result = await pool.query('SELECT id, username, email, role FROM users WHERE id = $1', [userId]);
  if (result.rowCount === 0) {
    throw new AppError('User not found', 404);
  }
  return result.rows[0];
};

export const removeUser = async (userId: number) => {
  const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);
  if (result.rowCount === 0) {
    throw new AppError('User not found or already deleted', 404);
  }
  return result.rows[0];
};

export const changeUserRole = async (userId: number, role: 'user' | 'admin') => {
  const result = await pool.query(
    'UPDATE users SET role = $1 WHERE id = $2 RETURNING id, username, email, role',
    [role, userId]
  );
  if (result.rowCount === 0) {
    throw new AppError('User not found', 404);
  }
  return result.rows[0];
};
