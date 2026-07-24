import express from "express";
import { login, logout } from "../controllers/authController.js";
import validate from "../middleware/validate.js";
import { loginSchema } from "../schemas/authSchema.js";

const router = express.Router();

router.post("/login", validate(loginSchema), login);

router.post("/logout", logout);

export default router;