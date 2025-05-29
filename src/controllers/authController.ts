// src/controllers/auth.controller.ts

import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authservice';
import { asyncHandler } from '../middlewares/errorHandling';

// 🔹 Register User
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.register(req.body);
  res.status(201).json(result);
});

// 🔹 Login User
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);
  res.json(result);
});

// 🔹 Get Profile
export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const result = await authService.getProfile(userId);
  res.json(result);
});

// 🔹 Forgot Password
export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.forgotPassword(req.body.email);
  res.json(result);
});

// 🔹 Verify OTP
export const verifyOtp = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.verifyOtp(req.body);
  res.json(result);
});

// 🔹 Reset Password
export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.resetPassword(req.body);
  res.json(result);
});
