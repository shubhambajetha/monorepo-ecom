import { Router, type Router as ExpressRouter } from 'express';
import authenticate from '../../middleware/authenticate';
import {
  createWishlist,
  deleteWishlist,
  getWishlist,
  movetocart,
} from '../../controllers/wishlisht/wishlisht.controller';

const router: ExpressRouter = Router();

// Apply authentication routes
router.use(authenticate);
router.post('/create/:productId', createWishlist);
router.get('/get', getWishlist);
router.post('/movetocart/:productId', movetocart);
router.delete('/delete/:productId', deleteWishlist);
export default router;
