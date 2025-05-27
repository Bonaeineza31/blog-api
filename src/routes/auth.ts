import express from 'express';
import { registerUser, loginUser, getProfile } from '../controllers/authController';
import authMiddleware from '../middlewares/authMiddleware';
import { forgotPassword } from '../controllers/authController';
import { verifyOtp } from '../controllers/authController';
import { resetPassword } from '../controllers/authController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getProfile); // protected
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

export default router;
