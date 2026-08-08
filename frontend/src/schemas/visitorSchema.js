import { z } from "zod";
export const visitorSchema = z.object({

    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .regex(/^[a-zA-Z\s]+$/, "Only characters are allowed, numbers are not allowed"),

    email: z
        .email("Invalid email address"),

    phone: z
        .string()
        .regex(/^[6-9]\d{9}$/, "Invalid phone number"),

   
        purpose: z
        .string()
        .trim()
        .min(3, "Purpose is required")
.regex(/^[a-zA-Z\s]+$/, "Only characters are allowed, numbers are not allowed"),

    person_to_visit: z
        .string()
        .trim()
        .min(2, "Person to visit is required")
        .regex(/^[a-zA-Z\s]+$/, "Only characters are allowed, numbers are not allowed"),

    department: z
        .string()
        .trim()
        .min(2, "Department is required"),

    visit_date: z
        .string()
        .date("Invalid visit date"),

    check_in_time: z
        .string()
        .time("Invalid check-in time")

});