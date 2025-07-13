import { Request, Response } from 'express';
import { CreateUserRequestBody } from "../types/request.d.js";
import { userRepository } from "@repositories/user.repository.js";
import { hashPassword } from "@utils/auth.utils.js";

export const create = async (
  req: Request<unknown, unknown, CreateUserRequestBody>,
  res: Response
) => {
  const { email, name, password } = req.body;

  const userId = createUserIdFromEmail(email);

  const existingUser = await userRepository.findById(userId);

  if (existingUser) {
    res.status(400).json({ status: "error", message: "User already exists." });
  }

  const hashedPassword = await hashPassword(password);

  await userRepository.create({
    userId: userId,
    userName: name,
    email: email,
    hashedPassword: hashedPassword,
    createdAt: new Date(),
  });

  res.status(201).json({ userId, email, name });
};

export const createUserIdFromEmail = (email: string): string => {
  return email.replace(/[^a-zA-Z0-9_-]/g, "_");
};