import { Router } from 'express';
import * as postController from '../controllers/postController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/authorizeMiddleware';
import { validate } from '../middlewares/validateMiddleware';
import {
  createPostSchema,
  updatePostSchema,
  deletePostSchema,
  getPostByIdSchema
} from '../schema/blogschema';

const router = Router();

router.post(
  '/',
  authMiddleware,
  validate(createPostSchema),
  postController.createPost
);

router.get('/', postController.getAllPosts);

router.get(
  '/:id',
  validate(getPostByIdSchema),
  postController.getPostById
);

router.put(
  '/:id',
  authMiddleware,
  authorize(['admin']), // Only admin can update
  validate(updatePostSchema),
  postController.updatePost
);

router.delete(
  '/:id',
  authMiddleware,
  authorize(['admin']), // Only admin can delete
  validate(deletePostSchema),
  postController.deletePost
);

export default router;
