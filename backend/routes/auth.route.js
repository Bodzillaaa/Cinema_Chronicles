import express from "express";
import {
  adminLogin,
  adminLogout,
  adminSignup,
  forgotPassword,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/adminsignup", adminSignup);
router.post("/adminlogin", adminLogin);
router.post("/adminlogout", adminLogout);

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.post("/logout", logout);

export default router;
