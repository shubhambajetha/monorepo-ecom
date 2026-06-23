import "express";
import "multer";

declare global {
  namespace Express {
    interface Request {
      cookies?: Record<string, string | undefined>;
      file?: Multer.File;
      files?: Multer.File[] | { [fieldname: string]: Multer.File[] };
    }
  }
}

export {};
