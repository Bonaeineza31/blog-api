import { Router } from 'express';
import {
  registerUser,
  loginUser,
  getProfile,
  forgotPassword,
  verifyOtp,
  resetPassword
} from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validateMiddleware';
import {  registerSchema,  loginSchema, forgotPasswordSchema, resetPasswordSchema, verifyOtpSchema} from '../schema/userschema';

const authRouter = Router();

// ✅ Auth Routes
authRouter.post('/register', validate(registerSchema), registerUser);
authRouter.post('/login', validate(loginSchema), loginUser);
authRouter.get('/profile', authMiddleware, getProfile);

// ✅ Password Reset Routes
authRouter.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
authRouter.post('/verify-otp', validate(verifyOtpSchema), verifyOtp);
authRouter.post('/reset-password', validate(resetPasswordSchema), resetPassword);

export default authRouter;
