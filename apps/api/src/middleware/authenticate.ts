import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'No token provided',
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        message: 'Token missing',
      });
    }
    
    const secret = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('JWT access secret is missing');
    }

    const decoded = jwt.verify(token, secret) as any;

    // Normalize payload so downstream code can rely on `req.user.id`.
    const userId = decoded?.userId ?? decoded?.id;
    const role = decoded?.role;
    req.user = userId ? { id: userId, role } : (decoded as any);

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }
};

export default authenticate;
