import express from "express";

import validate from "../middleware/validate.js";

import { visitorSchema } from "../schemas/visitorSchema.js";

import { createVisitorPass } from "../controllers/visitorController.js";

const router = express.Router();

router.post(
    "/",
    validate(visitorSchema),
    createVisitorPass
);

export default router;