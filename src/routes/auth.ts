import express from 'express';
import { registerUser, loginUser, getProfile } from '../controllers/authController';
import authMiddleware from '../middlewares/authMiddleware';
import { forgotPassword } from '../controllers/authController';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getProfile); // protected
router.post('/forgot-password', forgotPassword);

export default router;
