import express from "express";
import validate from "../middleware/validate.js";

import { visitorSchema } from "../schemas/visitorSchema.js";
import { checkoutSchema } from "../schemas/checkoutSchema.js";
import { createVisitorPass,getVisitorPass,verifyVisitorPass,checkoutVisitorPass } from "../controllers/visitorController.js";
import { protect,securityOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",
    validate(visitorSchema),
    createVisitorPass
);
router.get("/pass/:token",
    getVisitorPass
);

router.patch("/:token/verify",
    protect,
    securityOnly,
    verifyVisitorPass
);


router.patch("/:token/checkout",
    protect,
    securityOnly,
    validate(checkoutSchema),
    checkoutVisitorPass
);

export default router;