import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import validator from "validator";

// Schemas
const createUserSchema = z.object({
  email: z
    .string()
    .email({ message: "Please provide a valid email address." })
    .min(1, { message: "Email is required." }),
  name: z
    .string()
    .min(1, { message: "Name is required." })
    .refine(
      (value) => {
        return validator.isAlpha(value.replace(/\s/g, ""), "en-US", {
          ignore: " ",
        });
      },
      {
        message: "Name must contain only letters and spaces.",
      }
    ),
  password: z
    .string()
    .min(1, { message: "Password is required." })
    .refine(
      (value) => {
        const passwordConfig = {
          minLength: 4,
          minUppercase: 0,
          minNumbers: 0,
          minSymbols: 0,
        };
        return validator.isStrongPassword(value, passwordConfig);
      },
      {
        message: "Password must have a minimum length of 4.",
      }
    ),
});

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please provide a valid email address." })
    .min(1, { message: "Email is required." }),
  password: z
    .string()
    .min(1, { message: "Password is required." })
    .refine(
      (value) => {
        const passwordConfig = {
          minLength: 4,
          minUppercase: 0,
          minNumbers: 0,
          minSymbols: 0,
        };
        return validator.isStrongPassword(value, passwordConfig);
      },
      {
        message: "Password must have a minimum length of 4.",
      }
    ),
});

// Inferred types
export type CreateUserRequestBody = z.infer<typeof createUserSchema>;
export type loginRequestBody = z.infer<typeof loginSchema>;


// Validators
export const validateCreateUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        createUserSchema.parse(req.body);

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

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    loginSchema.parse(req.body);

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