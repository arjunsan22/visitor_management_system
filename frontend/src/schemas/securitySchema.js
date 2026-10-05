import { z } from "zod";

export const securitySchema = z.object({

    name: z
        .string()
        .trim()
        .min(4, "Name must be at least 4 characters")
        .max(100, "Name must be at most 100 characters"),

    email: z
        .string()
        .trim()
        .email("Invalid email"),

    phone: z
        .string()
        .trim()
        .regex(/^[6-9]\d{9}$/, "Invalid phone number"),

    password: z
        .string()
        .min(5, "Password must be at least 5 characters"),

});

export const updateSecuritySchema = z.object({

    name: z
        .string()
        .trim()
        .min(4, "Name must be at least 4 characters")
        .max(100, "Name must be at most 100 characters"),

    email: z
        .string()
        .trim()
        .email("Invalid email"),

    phone: z
        .string()
        .trim()
        .regex(/^[6-9]\d{9}$/, "Invalid phone number"),

});
