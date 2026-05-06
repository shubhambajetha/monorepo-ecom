import { Router } from "express";
import {
  logoutUser,
  refreshTokenHandler,
  signinUser,
  signupUser,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.post("/refresh", refreshTokenHandler);
router.post("/logout", logoutUser);

export default router;
