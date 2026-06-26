import express, { type Router } from "express";
import userRoutes from "./user.routes.js";
import productRoutes from "./product.routes.js";

const router: Router = express.Router();

// mount routes
router.use("/auth", userRoutes);
router.use("/products", productRoutes);

export default router;
