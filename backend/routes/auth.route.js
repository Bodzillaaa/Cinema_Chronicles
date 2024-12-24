import express from "express";
import {
  forgotPassword,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.post("/logout", logout);

export default router;
