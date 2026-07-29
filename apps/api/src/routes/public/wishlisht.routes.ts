import { Router, type Router as ExpressRouter } from 'express';
import authenticate from '../../middleware/authenticate';
import { createWishlist, deleteWishlist, getWishlist } from '../../controllers/wishlisht/wishlisht.controller';

const router: ExpressRouter = Router();

// Apply authentication routes
router.use(authenticate);
router.post('/create', createWishlist);
router.get('/get', getWishlist);
router.delete('/delete/:productId', deleteWishlist);
export default router