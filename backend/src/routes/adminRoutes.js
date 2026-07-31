import express from "express";
import { dashboardStats, getVisitors } from "../controllers/adminController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard",protect,adminOnly,dashboardStats);

router.get("/visitors",protect,adminOnly,getVisitors);

export default router;