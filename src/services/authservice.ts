import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';
import { generateOtp } from '../utils/otp';
import { sendOtpEmail } from '../utils/emailService';
import { AppError } from '../utils/errors';

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

// 🔐 REGISTER
export const register = async (data: { username: string; email: string; password: string }) => {
  const { username, email, password } = data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, role',
    [username, email, hashedPassword]
  );

  const user = result.rows[0];

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

  return { message: 'User registered', user, token };
};

// 🔐 LOGIN
export const login = async (data: { email: string; password: string }) => {
  const { email, password } = data;

  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

  return { message: 'Login successful', token };
};

// 🔐 PROFILE
export const getProfile = async (userId: number) => {
  const result = await pool.query('SELECT id, username, email, role FROM users WHERE id = $1', [userId]);
  const user = result.rows[0];

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};

// 🔐 FORGOT PASSWORD
export const forgotPassword = async (email: string) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];

  if (!user) throw new AppError('No account with that email', 404);

  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 10 * 60000); // 10 minutes

  await pool.query(
    'INSERT INTO password_resets (email, otp, expires_at) VALUES ($1, $2, $3)',
    [email, otp, expiresAt]
  );

  await sendOtpEmail(email, otp);

  return { message: 'OTP sent to your email' };
};

// 🔐 VERIFY OTP
export const verifyOtp = async (data: { email: string; otp: string }) => {
  const { email, otp } = data;

  const result = await pool.query(
    'SELECT * FROM password_resets WHERE email = $1 AND otp = $2 ORDER BY expires_at DESC LIMIT 1',
    [email, otp]
  );

  const record = result.rows[0];

  if (!record) throw new AppError('Invalid OTP', 400);
  if (new Date(record.expires_at) < new Date()) throw new AppError('OTP has expired', 400);

  return { message: 'OTP verified successfully' };
};

// 🔐 RESET PASSWORD
export const resetPassword = async (data: { email: string; otp: string; newPassword: string }) => {
  const { email, otp, newPassword } = data;

  const result = await pool.query(
    'SELECT * FROM password_resets WHERE email = $1 AND otp = $2 ORDER BY expires_at DESC LIMIT 1',
    [email, otp]
  );

  const record = result.rows[0];
  if (!record) throw new AppError('Invalid OTP', 400);
  if (new Date(record.expires_at) < new Date()) throw new AppError('OTP has expired', 400);

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await pool.query('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, email]);
  await pool.query('DELETE FROM password_resets WHERE email = $1', [email]);

  return { message: 'Password reset successful' };
};
