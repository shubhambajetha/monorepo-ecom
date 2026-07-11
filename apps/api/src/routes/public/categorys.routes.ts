import { Router, type Router as ExpressRouter } from 'express';
import {
  getAllProducts,
  getfeaturedproduct,
  getProduct,
  getProductFilters,
} from '../../controllers/catgories/product.controller';
import { getAllCategories, getCategory } from '../../controllers/catgories/category.controller';
import {
  getAllSubCategories,
  getSubCategory,
} from '../../controllers/catgories/subcategory.controller';
import {
  getAllCollections,
  getCollection,
} from '../../controllers/catgories/collection.controller';

const router: ExpressRouter = Router();

// Filters
router.get('/filters', getProductFilters);

// Categories
router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategory);

// Subcategories
router.get('/subcategories', getAllSubCategories);
router.get('/subcategories/:id', getSubCategory);

// Collections
router.get('/collections', getAllCollections);
router.get('/collections/:id', getCollection);

// Products
router.get('/products', getAllProducts);
router.get('/products/:id', getProduct);
router.get('/product/featured', getfeaturedproduct);

export default router;
