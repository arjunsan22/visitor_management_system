import express from "express";

import validate from "../middleware/validate.js";

import { visitorSchema } from "../schemas/visitorSchema.js";

import { createVisitorPass,getVisitorPass } from "../controllers/visitorController.js";

const router = express.Router();

router.post("/",
    validate(visitorSchema),
    createVisitorPass
);
router.get("/pass/:token",
    getVisitorPass
);
export default router;