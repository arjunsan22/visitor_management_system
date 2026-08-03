import express from "express";
import { protect, securityOnly } from "../middleware/authMiddleware.js";

import { getVisitorByPassToken } from "../controllers/securityController.js";

const router = express.Router();

router.get("/pass/:token",protect,securityOnly,getVisitorByPassToken);

export default router;