import { Router, type Router as ExpressRouter } from 'express';

import isAdmin from '../../middleware/isAdmin';
import { upload, uploadProductImages } from '../../middleware/upload';

import {
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../controllers/catgories/category.controller';

import {
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from '../../controllers/catgories/subcategory.controller';

import {
  createCollection,
  updateCollection,
  deleteCollection,
} from '../../controllers/catgories/collection.controller';

import {
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../controllers/catgories/product.controller';
import authenticate from '../../middleware/authenticate';

const router: ExpressRouter = Router();

// Apply authentication and admin check to all admin routes
router.use(authenticate, isAdmin);

// Categories
router.post('/categories', upload.single('image'), createCategory);
router.put('/categories/:id', upload.single('image'), updateCategory);
router.delete('/categories/:id', deleteCategory);

// Subcategories
router.post('/subcategories', upload.single('image'), createSubCategory);
router.put('/subcategories/:id', upload.single('image'), updateSubCategory);
router.delete('/subcategories/:id', deleteSubCategory);

// Collections
router.post('/collections', upload.single('bannerImage'), createCollection);
router.put('/collections/:id', upload.single('bannerImage'), updateCollection);
router.delete('/collections/:id', deleteCollection);

// Products
router.post('/products', uploadProductImages, createProduct);

router.put('/products/:id', uploadProductImages, updateProduct);

router.delete('/products/:id', deleteProduct);

export default router;
