
import { z } from "zod";

export const checkoutSchema = z.object({
    check_out_at: z
        .string()
        .regex(
            /^([01]\d|2[0-3]):([0-5]\d)$/,
            "Checkout time must be in HH:MM format"
        ),
});