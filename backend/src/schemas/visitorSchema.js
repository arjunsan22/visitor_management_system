import { z } from "zod";
export const visitorSchema = z.object({

    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters"),

    email: z
        .email("Invalid email address"),

    phone: z
        .string()
        .regex(/^[6-9]\d{9}$/, "Invalid phone number"),

    purpose: z
        .string()
        .trim()
        .min(3, "Purpose is required"),

    person_to_visit: z
        .string()
        .trim()
        .min(2, "Person to visit is required"),

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