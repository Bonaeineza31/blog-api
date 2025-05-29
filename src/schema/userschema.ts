import { z } from 'zod';


export const registerSchema = z.object({
  body: z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long")
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password is required")
  })
});


export const updateUserRoleSchema = z.object({
  body: z.object({
    role: z.enum(['user', 'admin'], {
      errorMap: () => ({ message: 'Role must be either "user" or "admin"' })
    })
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, "User ID must be a number")
  })
});


export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format")
  })
});


export const resetPasswordSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    otp: z.string().length(6, "OTP must be 6 digits"),
    newPassword: z.string().min(6, "New password must be at least 6 characters")
  })
});


export const verifyOtpSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    otp: z.string().length(6, "OTP must be 6 digits")
  })
});
