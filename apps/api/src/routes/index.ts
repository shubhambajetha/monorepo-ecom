import express, { type Router } from "express";
import userRoutes from "./user.routes.js";
import admincategory from './admin/admincategory.route.js'
import categorys from './public/categorys.routes.js'

const router: Router = express.Router();

// mount routes
router.use("/auth", userRoutes);
router.use('/admincate',admincategory)
router.use('/usercate', categorys)
export default router;
