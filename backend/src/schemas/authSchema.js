import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .email("Please enter a valid email"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
});


export const createSecuritySchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(20, "Name is too long"),

    email: z
        .email("Please enter a valid email"),

    phone: z
        .string()
        .regex(/^[6-9]\d{9}$/, "Please enter a valid phone number"),

password: z
  .string()
  .min(5, "Password must be at least 5 characters")
  .regex(
    /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
    "Password must contain at least one uppercase letter and one special character"
  ),
    role: z
        .enum(["security"])
});