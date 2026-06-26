import { Router, type Router as ExpressRouter } from 'express';
import {
  createProduct,
  getAllProducts,
  getProductFilters,
  getProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/catgories/product.controller.js';
import { uploadProductImages } from '../middleware/upload.js';

const router: ExpressRouter = Router();

// Retrieve all filters (metadata for UI) - must define before /:id route
router.get('/filters', getProductFilters);

// Basic CRUD routes
router.get('/', getAllProducts);
router.get('/:id', getProduct);

router.post('/', uploadProductImages, createProduct);
router.put('/:id', uploadProductImages, updateProduct);
router.delete('/:id', deleteProduct);

export default router;
