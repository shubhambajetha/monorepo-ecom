import { Router, type Router as ExpressRouter } from 'express';
import { getHomeCollections, getHomelatestproduct, getHomeSportlight } from '../../controllers/home/homepage.controller';

const router: ExpressRouter = Router();


router.get('/homedata/categories',getHomeCollections)
router.get('/homedata/newarrival', getHomelatestproduct)
router.get('/homedata/sportlight', getHomeSportlight)


export default router