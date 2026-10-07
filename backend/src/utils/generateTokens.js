//generateTokens.js
import jwt from "jsonwebtoken";

export const generateTokens = (admin) => {

    const accessToken = jwt.sign(
        {
            id: admin.id,
            role: admin.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "1h",
        }
    );

    const refreshToken = jwt.sign(
        {
            id: admin.id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "27d",
        }
    );

    return {
        accessToken,
        refreshToken,
    };
};