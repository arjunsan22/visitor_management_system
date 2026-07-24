import jwt from "jsonwebtoken";
import { findById } from "../models/Admin.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const protect = asyncHandler(async (req, res, next) => {

    const token = req.cookies.accessToken;

    if (!token) {
        throw new ApiError(401, "Please login first");
    }

    const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
    );

    const admin = await findById(decoded.id);

    if (!admin) {
        throw new ApiError(401, "User not found");
    }

    delete admin.password;

    req.user = admin;

    next();

});

export const adminOnly = (req, res, next) => {

    if (req.user.role !== "admin") {
        throw new ApiError(403, "Access denied");
    }

    next();

};