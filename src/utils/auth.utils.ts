import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "@config/config.js";
import { UserRecord } from "@models/user.js";

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
  return jwt.sign({ id: user.userId }, config.jwtSecret, {
    expiresIn: "1h",
  });
};