import { v4 as uuidv4 } from "uuid";
import { createVisitor, findByPassToken, verifyVisitor, checkoutVisitor ,updateVisitorImage} from "../models/Visitor.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { sendVisitorPassEmail } from "../utils/sendEmail.js";

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

  // Send visitor pass email (fire-and-forget)
  sendVisitorPassEmail({
    name,
    email,
    phone,
    purpose,
    person_to_visit,
    department,
    visit_date,
    check_in_time,
    pass_token,
  }).catch((err) => {
    console.error("Failed to send visitor pass email:", err.message);
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        visitorId,
        pass_token,
      },
      "Visitor pass created successfully. Pass details have been sent to your email.",
    ),
  );
});
///////////////////////
export const getVisitorPass = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const visitor = await findByPassToken(token);

  if (!visitor) {
    throw new ApiError(404, "Visitor pass not found");
  }

 return res.status(200).json(
    new ApiResponse(
        200,
        {
            name: visitor.name,
            email: visitor.email,
            phone: visitor.phone,
            purpose: visitor.purpose,
            person_to_visit: visitor.person_to_visit,
            department: visitor.department,
            visit_date: visitor.visit_date,
            check_in_time: visitor.check_in_time,
            status: visitor.status,
            verified_by: visitor.verified_by_name,
            verified_at: visitor.verified_at,
            check_out_at: visitor.check_out_at,
            image: visitor.image,
        },
        "Visitor pass fetched successfully"
    )
);
});

/////////////////////////
export const verifyVisitorPass = asyncHandler(async (req, res) => {

    
    const { token } = req.params;
    const verified_by = req.user.id;
    const visitor = await findByPassToken(token);

    if (!visitor) {
        throw new ApiError(404, "Visitor not found");
    }

    if (visitor.status === "Verified") {
        throw new ApiError(400, "Visitor already verified");
    }

const result = await verifyVisitor(token, verified_by);

if (result.affectedRows === 0) {
    throw new ApiError(404, "Visitor not found");
}

return res.status(200).json(
    new ApiResponse(
        200,
        {},
        "Visitor verified successfully"
    )
);

});

export const checkoutVisitorPass = asyncHandler(async (req, res) => {

    const { token } = req.params;
    const { check_out_at } = req.body;

    const visitor = await findByPassToken(token);

    if (!visitor) {
    throw new ApiError(404, "Visitor not found");
}

    if (visitor.status !== "Verified") {
    throw new ApiError(
        400,
        "Visitor must be verified before checkout"
    );
}

    await checkoutVisitor(
        token,
        check_out_at
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Visitor checked out successfully"
        )
    );

});

export const uploadVisitorImage = asyncHandler(async (req, res) => {
    const { token } = req.params;

    if (!req.file) {
        throw new ApiError(400, "Please upload an image file");
    }

    const visitor = await findByPassToken(token);
    
    if (!visitor) {
        throw new ApiError(404, "Visitor not found");
    }

    // Only allow uploading if pending or verified, but not checked out
    if (visitor.status === 'Checked Out') {
        throw new ApiError(400, "Cannot add image to a checked-out visitor");
    }

    // The file path to store in DB
    const imagePath = `/uploads/visitors/${req.file.filename}`;

    // Update in DB (we need to import updateVisitorImage)

    await updateVisitorImage(token, imagePath);

    return res.status(200).json(
        new ApiResponse(
            200,
            { image: imagePath },
            "Visitor image uploaded successfully"
        )
    );
});
