import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract the token from Bearer

    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

      // Check if the user role is allowed
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      // Attach user info to the request object
      (req as any).user = decoded;
      next();
    } catch (error) {
      res.status(400).json({ message: 'Invalid Token' });
    }
  };
};
