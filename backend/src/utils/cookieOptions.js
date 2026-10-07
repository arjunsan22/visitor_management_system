//cookieOptions.js
const isProduction = process.env.NODE_ENV === "production"

export const accessCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none":"lax",
    maxAge: 1 * 60 * 60 * 1000, // 1 hour
};

export const refreshCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none":"lax",
    maxAge: 27 * 24 * 60 * 60 * 1000,
};