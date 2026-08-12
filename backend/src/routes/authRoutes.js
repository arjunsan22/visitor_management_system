import express from "express";
import { login, logout, refreshAccessToken, getCurrentUser} from "../controllers/authController.js";
import validate from "../middleware/validate.js";
import { loginSchema } from "../schemas/authSchema.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();
//for all login and get jwt
router.post("/login", validate(loginSchema), login);

router.post("/logout", logout);

router.post("/refresh",refreshAccessToken);

router.get("/me",protect,getCurrentUser);

export default router;