import { Router } from "express";
import {
  changePassword,
  createUser,
  forgotPassword,
  getMyProfile,
  login,
  resetPassword,
  verifyResetToken,
} from "../controllers/auth.controller.js";
import { auth } from "../Middleware/auths.js";

const router = Router();

router.post("/register", createUser);
router.post("/login", login);
router.get("/me", auth, getMyProfile);
router.patch("/change-password", auth, changePassword);
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-token", verifyResetToken);
// router.post("/email", email);
router.post("/reset-password", resetPassword);

export default router;
