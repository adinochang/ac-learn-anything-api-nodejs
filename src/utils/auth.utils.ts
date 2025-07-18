import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "@config/config.js";
import { UserRecord } from "@models/user.js";
import { AuthenticatedJwtPayload } from "../types/request.js";

const SALT_ROUNDS = 10;

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);

  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);

  return isMatch;
};

export const generateJwtToken = (user: UserRecord): string => {
  return jwt.sign({ userId: user.userId }, config.jwtSecret, {
    expiresIn: "1h",
  });
};

export const verifyJwtToken = (token: string): AuthenticatedJwtPayload | void => {
  return jwt.verify(token, config.jwtSecret, (err, payload) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        throw Error("Authentication failed: Token has expired.");
      }

      if (err.name === "JsonWebTokenError") {
        throw Error("Authentication failed: Invalid token.");
      }

      // Generic forbidden for other JWT errors
      throw Error("Authentication failed: Forbidden.");
    }

    return payload;
  });
};