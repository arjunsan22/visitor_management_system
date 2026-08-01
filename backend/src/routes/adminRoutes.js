import express from "express";
import { dashboardStats, getVisitors, createSecurity, getAllSecurity, updateSecurity, deleteSecurity } from "../controllers/adminController.js";
import validate from "../middleware/validate.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { securitySchema } from "../schemas/securitySchema.js";
import { updateSecuritySchema } from "../schemas/updateSecuritySchema.js";

const router = express.Router();

router.get("/dashboard",protect,adminOnly,dashboardStats);

router.get("/visitors",protect,adminOnly,getVisitors);

router.post("/security",protect,adminOnly,validate(securitySchema),createSecurity);

router.get("/security",protect,adminOnly,getAllSecurity);

router.put("/security/:id",protect,adminOnly,validate(updateSecuritySchema),updateSecurity);

router.delete("/security/:id",protect,adminOnly,deleteSecurity);

export default router;