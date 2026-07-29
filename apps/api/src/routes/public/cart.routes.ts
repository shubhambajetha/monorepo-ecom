import { Router, type Router as ExpressRouter } from 'express';
import authenticate from '../../middleware/authenticate';

import {
  createCart,
  getCart,
  countItems,
  removeSingle,
  clearCart,
} from '../../controllers/cart/cart.controller';

const router: ExpressRouter = Router();

// Apply authentication middleware to all cart routes
router.use(authenticate);

/**
 * Cart Routes
 */

// Add item to cart
router.post('/create', createCart);

// Get all cart items
router.get('/get', getCart);

// Get cart items count
router.get('/count', countItems);

// Remove single cart item
router.delete('/:id', removeSingle);

// Clear entire cart
router.delete('/clear', clearCart);

export default router;
