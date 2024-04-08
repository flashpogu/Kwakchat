import express from "express";
import { protectRoute } from "../utils/protectRoute.js";
import { getUsersForSidebar } from "../controllers/userControllers.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);

export default router;
