
import { getDashboardStats } from "../models/Admin.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const dashboardStats = asyncHandler(async (req, res) => {

const stats = await getDashboardStats();

return res.status(200).json(
        new ApiResponse(
            200,
            stats,
            "Dashboard statistics fetched successfully"
        )
    );

});