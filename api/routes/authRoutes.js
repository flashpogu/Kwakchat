import express from "express";
import {
  signup,
  login,
  logout,
  google,
} from "../controllers/authControllers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/google", google);

export default router;
