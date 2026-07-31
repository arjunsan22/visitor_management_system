import { ZodError } from "zod";
const validate = (schema) => {
    return async (req, res, next) => {
        try {
            req.body = await schema.parseAsync(req.body);
            next();

        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    success: false,
                    message: error.issues[0].message
                });

            }

            next(error);

        }
    };
};

export default validate;