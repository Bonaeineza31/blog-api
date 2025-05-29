// src/middlewares/authorize.middleware.ts
import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
  user?: {
    role: 'user' | 'admin';
  };
}

export const authorize = (allowedRoles: ('user' | 'admin')[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ message: 'This User has insufficient permission' });
      return;
    }

    next();
  };
};
