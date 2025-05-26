import express from 'express';
import { registerUser, loginUser, getProfile } from '../controllers/authController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getProfile); // protected

export default router;
