import bcrypt from "bcrypt";
import { findByEmail } from "../models/Admin.js";

import { generateTokens } from "../utils/generateTokens.js";
import { accessCookieOptions,
    refreshCookieOptions,
} from "../utils/cookieOptions.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
 const admin = await findByEmail(email);

    if (!admin) {
        throw new ApiError(401, "Invalid Credential");
    }

    const isPasswordMatch = await bcrypt.compare(
        password,
        admin.password
    );

    if (!isPasswordMatch) {
        throw new ApiError(401, "Invalid Credential");
    }

   
   
    const { accessToken, refreshToken } = generateTokens(admin);

    res.cookie(
        "accessToken",
        accessToken,
        accessCookieOptions
    );

    res.cookie(
        "refreshToken",
        refreshToken,
        refreshCookieOptions
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                id: admin.id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
            "Login successful"
        )
    );
});

export const logout = asyncHandler(async (req, res) => {

    res.clearCookie("accessToken");

    res.clearCookie("refreshToken");

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Logout successful"
        )
    );

});