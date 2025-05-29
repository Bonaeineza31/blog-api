import { Router } from 'express';
import { getAllUsers,  getUserById, deleteUser, updateUserRole} from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/authorizeMiddleware';

const userRouter = Router();

// ✅ Only accessible by admins
userRouter.get('/', authMiddleware, authorize(['admin']), getAllUsers);
userRouter.get('/:id', authMiddleware, authorize(['admin']), getUserById);
userRouter.delete('/:id', authMiddleware, authorize(['admin']), deleteUser);
userRouter.patch('/:id/role', authMiddleware, authorize(['admin']), updateUserRole);

export default userRouter;
