import { Router, type Router as ExpressRouter } from "express";
import {
  logoutUser,
  refreshTokenHandler,
  signinUser,
  signupUser,
} from "../../controllers/user.controller";

const router: ExpressRouter = Router();

router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.post("/refresh", refreshTokenHandler);
router.post("/logout", logoutUser);

export default router;
