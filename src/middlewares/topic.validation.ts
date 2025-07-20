import { z, ZodError, ZodIssueCode } from "zod";
import { Request, Response, NextFunction } from "express";
import { TopicStatus, TopicLevel } from "@models/topic.js";

// Schemas
const createTopicSchema = z.object({
  topic: z.string().min(2, { message: "Topic is required." }),
  description: z.string().min(2, { message: "Description is required." }),
  level: z.coerce
    .number()
    .pipe(
      z.nativeEnum(TopicLevel, {
        errorMap: (issue, ctx) => {
          if (issue.code === ZodIssueCode.invalid_enum_value) {
            return {
              message: "Topic level is invalid.",
            };
          }
          return { message: ctx.defaultError };
        },
      })
    )
    .optional(),
});

const updateTopicSchema = z.object({
  topic: z.string().min(2, { message: "Topic is required." }),
  description: z.string().min(2, { message: "Description is required." }),
  status: z.coerce.number().pipe(
    z.nativeEnum(TopicStatus, {
      errorMap: (issue, ctx) => {
        if (issue.code === ZodIssueCode.invalid_enum_value) {
          return {
            message: "Status is invalid.",
          };
        }
        return { message: ctx.defaultError };
      },
    })
  ),
  level: z.coerce.number().pipe(
    z.nativeEnum(TopicLevel, {
      errorMap: (issue, ctx) => {
        if (issue.code === ZodIssueCode.invalid_enum_value) {
          return {
            message: "Topic level is invalid.",
          };
        }
        return { message: ctx.defaultError };
      },
    })
  ),
});

// Inferred types
export type CreatTopicRequestBody = z.infer<typeof createTopicSchema>;
export type UpdateTopicRequestBody = z.infer<typeof updateTopicSchema>;

// Validators
export const validateCreateTopic = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    createTopicSchema.parse(req.body);

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
