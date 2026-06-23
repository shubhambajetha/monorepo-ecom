import express, { type Router } from "express";
import userRoutes from "./user.routes.js";

const router: Router = express.Router();

// mount routes
router.use("/auth", userRoutes);

export default router;
