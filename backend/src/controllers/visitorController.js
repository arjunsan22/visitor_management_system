import { v4 as uuidv4 } from "uuid";
import { createVisitor, findByPassToken } from "../models/Visitor.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const createVisitorPass = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phone,
    purpose,
    person_to_visit,
    department,
    visit_date,
    check_in_time,
  } = req.body;

  const pass_token = uuidv4();
  const visitorId = await createVisitor({
    name,
    email,
    phone,
    purpose,
    person_to_visit,
    department,
    visit_date,
    check_in_time,
    pass_token,
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        visitorId,
        pass_token,
      },
      "Visitor pass created successfully",
    ),
  );
});

export const getVisitorPass = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const visitor = await findByPassToken(token);

  if (!visitor) {
    throw new ApiError(404, "Visitor pass not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, visitor, "Visitor pass fetched successfully"));
});
