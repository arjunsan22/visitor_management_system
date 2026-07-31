import express from "express";
import { dashboardStats } from "../controllers/adminController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/dashboard',protect,adminOnly,dashboardStats);

export default router;