import { Request, Response } from 'express';
import * as userService from '../services/usersservice';
import { asyncHandler } from '../middlewares/errorHandling';

// ✅ Get all users (Admin only)
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await userService.fetchAllUsers();
  res.json(users);
});


export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.fetchUserById(Number(id));
  res.json(user);
});

// ✅ Delete user by ID (Admin only)
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await userService.removeUser(Number(id));
  res.json({ message: 'User deleted successfully' });
});

// ✅ Update user role (Admin only)
export const updateUserRole = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;
  const updatedUser = await userService.changeUserRole(Number(id), role);
  res.json({ message: 'User role updated', user: updatedUser });
});
