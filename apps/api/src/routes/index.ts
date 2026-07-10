import express, { type Router } from "express";
import userRoutes from "./userauth/user.routes";
import admincategory from './admin/admincategory.route'
import categorys from './public/categorys.routes'
import homepage from './public/homepage.routes'

const router: Router = express.Router();

// mount routes
router.use("/auth", userRoutes);
router.use('/admincate',admincategory)
router.use('/usercate', categorys)
router.use('/homecate',homepage)

export default router;
