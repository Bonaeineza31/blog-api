// middlewares/checkAdmin.ts
import { Request, Response, NextFunction } from 'express'

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  const userRole = (req as any).userRole
  if (userRole !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' })
  }
  next()
}
