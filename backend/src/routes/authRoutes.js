import express from "express";
import { login, logout, refreshAccessToken} from "../controllers/authController.js";
import validate from "../middleware/validate.js";
import { loginSchema } from "../schemas/authSchema.js";

const router = express.Router();
//for all login and get jwt
router.post("/login", validate(loginSchema), login);

router.post("/logout", logout);

router.post("/refresh",refreshAccessToken);

export default router;