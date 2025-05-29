// import pool from '../db'
// import { AppError } from '../utils/errors';

// export const verifyEmail = async (token: string) => {
//   const result = await pool.query(
//     'SELECT * FROM email_verifications WHERE token = $1',
//     [token]
//   );
//   const record = result.rows[0];

//   if (!record) throw new AppError('Invalid token', 400);
//   if (new Date(record.expires_at) < new Date()) throw new AppError('Token expired', 400);

//   await pool.query('UPDATE users SET is_verified = TRUE WHERE id = $1', [record.user_id]);
//   await pool.query('DELETE FROM email_verifications WHERE user_id = $1', [record.user_id]);

//   return { message: 'Email verified successfully' };
// };
