import express from "express";
import userRoutes from "./user.routes.js";

const router = express.Router();

// mount routes
router.use("/auth", userRoutes);

export default router;
