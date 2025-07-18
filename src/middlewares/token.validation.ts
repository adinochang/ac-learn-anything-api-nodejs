import { Request, Response, NextFunction } from "express";
import { verifyJwtToken } from "@utils/auth.utils.js";
import {
  AuthenticatedRequest,
  AuthenticatedJwtPayload,
} from "../types/request.js";

export const authenticateJwtToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the Authorization header from the request
  const authHeader = req.headers["authorization"];
 
  // Check if the Authorization header exists and starts with 'Bearer '
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  // No token is provided, return 401 Unauthorized
  if (token == null) {
    console.error("Authentication Error: No token provided.");
    return res
      .status(401)
      .json({ message: "Authentication failed: No token provided." });
  }

  // Verify the token using the secret key
  try {
    const payload: AuthenticatedJwtPayload | void = verifyJwtToken(token);

    // Token is valid, attach the decoded user payload to the request object
    if (payload && payload.userId) {
      (req as AuthenticatedRequest).authenticatedUser = { id: payload.userId };
    }
      
    // Proceed to the next middleware or route handler
    next();
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(401).json({ message: err.message });
    } else {
      return res.status(500).json({ message: "An unknown error occurred." });
    }
  }
}; 