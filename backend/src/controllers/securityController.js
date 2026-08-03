import { findByPassToken } from "../models/Visitor.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const getVisitorByPassToken = asyncHandler(async (req, res) => {
 const { token } = req.params;

const visitor = await findByPassToken(token);

if (!visitor) {
        throw new ApiError(
            404,
            "Visitor pass not found"
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            visitor,
            "Visitor details fetched successfully"
        )
    );

});