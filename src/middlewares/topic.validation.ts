import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

// Schemas
const createTopicSchema = z.object({
  topic: z.string().min(2, { message: "Topic is required." }),
  description: z.string().min(2, { message: "Description is required." }),
});

const updateTopicSchema = z.object({
  topic: z.string().min(2, { message: "Topic is required." }),
  description: z.string().min(2, { message: "Description is required." }),
  status: z.union([z.literal("0"), z.literal("1")]),
});


// Inferred types
export type CreatTopicRequestBody = z.infer<typeof createTopicSchema>;
export type UpdateTopicRequestBody = z.infer<typeof updateTopicSchema>;


// Validators
export const validateCreateTopic = (req: Request, res: Response, next: NextFunction) => {
    try {
        createTopicSchema.parse(req.body);

        next();
    } catch (error) {
        if (error instanceof ZodError) {
            // Map Zod errors into a more readable format
            const errors = error.errors.map(err => err.message);
            
            return res.status(400).json({
                status: 'error',
                message: 'Validation failed',
                errors: errors
            });
        }

        // Handle other unexpected errors
        res.status(500).json({
            status: 'error',
            message: 'Internal server error during validation.'
        });
    }
};

export const validateUpdateTopic = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    updateTopicSchema.parse(req.body);

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      // Map Zod errors into a more readable format
      const errors = error.errors.map((err) => err.message);

      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: errors,
      });
    }

    // Handle other unexpected errors
    res.status(500).json({
      status: "error",
      message: "Internal server error during validation.",
    });
  }
};