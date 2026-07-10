import { Router, type Router as ExpressRouter } from 'express';
import { getHomeCollections, getHomelatestproduct } from '../../controllers/home/homepage.controller';

const router: ExpressRouter = Router();


router.get('/homedata/categories',getHomeCollections)
router.get('/homedata/newarrival', getHomelatestproduct)


export default router