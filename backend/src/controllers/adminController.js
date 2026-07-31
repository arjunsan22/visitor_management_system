
import { getDashboardStats } from "../models/Admin.js";
import { getVisitors as getVisitorsModel } from "../models/Visitor.js";
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


//////\\\\\\\\visitors search filtering sorting pagination///\\\\\\\
export const getVisitors = asyncHandler(async (req, res) => {

    const {
        page = 1,
        limit = 10,
        search = "",
        department = "",
        status = "",
        visit_date = "",
    } = req.query;

    const visitors = await getVisitorsModel({
        page,
        limit,
        search,
        department,
        status,
        visit_date,
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            visitors,
            "Visitors fetched successfully"
        )
    );

});