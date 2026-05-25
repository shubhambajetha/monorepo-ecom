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
    
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('JWT_SECRET is missing');
    }

    const decoded = jwt.verify(token, secret);

    req.user = decoded as any;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }
};

export default authenticate;
