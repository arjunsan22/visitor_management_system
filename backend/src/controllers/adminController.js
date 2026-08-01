import { getDashboardStats, getAllSecurity as getAllSecurityModel,  deleteSecurity as deleteSecurityModel} from "../models/Admin.js";
import { getVisitors as getVisitorsModel } from "../models/Visitor.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import bcrypt from "bcrypt";
import {findSecurityByEmail, createSecurity as createSecurityModel, 
    findSecurityById,updateSecurity as updateSecurityModel,findSecurityByEmailExceptId} from "../models/Admin.js";

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


//////\\\\\\\\visitors search filtering sorting pagination///\\\\\\
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

////\\\\ security creating ////\\\\

export const createSecurity = asyncHandler(async (req, res) => {

    const { name, email, phone, password } = req.body;

    const existingSecurity = await findSecurityByEmail(email);

    if (existingSecurity) {
        throw new ApiError(
            409,
            "Security already exists with this email"
        );
    }

    const hashedPassword = await bcrypt.hash(
        password,
        10
    );

    const securityId = await createSecurityModel({
        name,
        email,
        phone,
        password: hashedPassword,
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            {
                id: securityId,
            },
            "Security created successfully"
        )
    );
});

export const getAllSecurity = asyncHandler(async (req, res) => {

    const securityList = await getAllSecurityModel();

    return res.status(200).json(
        new ApiResponse(
            200,
            securityList,
            "Security list fetched successfully"
        )
    );

});

export const updateSecurity = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const {
        name,
        email,
        phone,
    } = req.body;

    const security = await findSecurityById(id);

    if (!security) {
        throw new ApiError(
            404,
            "Security not found"
        );
    }

    // Check dup mails /////excluding current secu//
    const existingSecurity = await findSecurityByEmailExceptId(
        email,
        id
    );

    if (existingSecurity) {
        throw new ApiError(
            409,
            "Security already exists with this email"
        );
    }

    await updateSecurityModel({
        id,
        name,
        email,
        phone,
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Security updated successfully"
        )
    );

});


export const deleteSecurity = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const security = await findSecurityById(id);

    if (!security) {
        throw new ApiError(
            404,
            "Security not found"
        );
    }

    await deleteSecurityModel(id);

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Security deleted successfully"
        )
    );

});