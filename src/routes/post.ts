import express from 'express';
import {createPost, getAllPosts, getPostById, updatePost,deletePost,} from '../controllers/postController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/posts', authMiddleware, createPost);
router.get('/posts', getAllPosts);
router.get('/posts/:id', getPostById);
router.put('/posts/:id', authMiddleware, updatePost);
router.delete('/posts/:id', authMiddleware, deletePost);

export default router;
