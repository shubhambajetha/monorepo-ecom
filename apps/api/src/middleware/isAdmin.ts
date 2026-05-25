import { Request, Response, NextFunction } from 'express';
import { success } from 'zod';

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'unautorize',
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Forbidden. Admin access required.',
    });
  }
  next();
};

export default isAdmin
