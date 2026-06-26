import { RequestHandler } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure the directory exists dynamically
const getUploadPath = (folder: string) => {
  // Use public/uploads or uploads directory
  const uploadDir = path.join(process.cwd(), 'uploads', folder);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  return uploadDir;
};

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = 'products';
    if (req.originalUrl.includes('/categories')) {
      folder = 'categories';
    } else if (req.originalUrl.includes('/collections')) {
      folder = 'collection';
    } else if (req.originalUrl.includes('/subcategories')) {
      folder = 'subCategory';
    }
    cb(null, getUploadPath(folder));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// Multer instances for different configurations
export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limits
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only images (JPEG, JPG, PNG, WEBP, GIF) are allowed!'));
  },
});

// Specific fields middleware for products upload
export const uploadProductImages: RequestHandler = upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'images', maxCount: 10 },
]);
