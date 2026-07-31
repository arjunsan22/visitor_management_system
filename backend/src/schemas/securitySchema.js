import { z } from "zod";

export const securitySchema = z.object({

    name: z
        .string()
        .trim()
        .min(4, "Name must be at least 4 characters")
        .max(100),

    email: z
        .email("Invalid email")
        .trim(),

    phone: z
        .string()
        .trim()
        .regex(/^[6-9]\d{9}$/, "Invalid phone number"),

    password: z
        .string()
        .min(5, "Password must be at least 5 characters"),

});