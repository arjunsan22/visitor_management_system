import express from "express";
import { dashboardStats, getVisitors, createSecurity } from "../controllers/adminController.js";
import validate from "../middleware/validate.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { securitySchema } from "../schemas/securitySchema.js";
const router = express.Router();

router.get("/dashboard",protect,adminOnly,dashboardStats);

router.get("/visitors",protect,adminOnly,getVisitors);

router.post("/security",protect,adminOnly,validate(securitySchema),createSecurity);



export default router;