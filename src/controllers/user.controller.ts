import { Request, Response, NextFunction } from "express";
import { CreateUserRequestBody, GetUserRequestParams } from "../types/request.d.js";
import { userRepository } from "@repositories/user.repository.js";
import { hashPassword, comparePassword } from "@utils/auth.utils.js";
import { UserRecord } from "@models/user.js";

export const create = async (
  req: Request<unknown, CreateUserRequestBody>,
  res: Response
) => {
  const { email, name, password } = req.body;

  const userId = createUserIdFromEmail(email);

  const existingUser: UserRecord | undefined = await userRepository.findById(
    userId
  );

  if (existingUser) {
    return res
      .status(400)
      .json({ status: "error", message: "User already exists." });
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

export const getUserById = async (
  req: Request<GetUserRequestParams>,
  res: Response
) => {
  const { userId } = req.params;

  const existingUser: UserRecord | undefined = await userRepository.findById(
    userId
  );

  if (!existingUser) {
    return res
      .status(400)
      .json({ status: "error", message: "User not found." });
  } else {
    res.status(201).json({
      userId: userId,
      userName: existingUser.userName,
      email: existingUser.email,
      createdAt: existingUser.createdAt,
    });
  }
};

export const login = async (
  req: Request<unknown, CreateUserRequestBody>,
  res: Response
) => {
  const { email, password } = req.body;

  const userId = createUserIdFromEmail(email);

  const existingUser: UserRecord | undefined = await userRepository.findById(
    userId
  );

  if (!existingUser) {
    return res
      .status(400)
      .json({ status: "error", message: "User not found." });
  } else {
    const isPasswordMatch = await comparePassword(
      password,
      existingUser.hashedPassword
    );

    if (!isPasswordMatch) {
      return res.status(400).json({
        status: "error",
        message: "Incorrect password. Please try again.",
      });
    }

    res.status(201).json({
      userId: userId,
      userName: existingUser.userName,
      email: existingUser.email,
      createdAt: existingUser.createdAt,
    });
  }
};

export const createUserIdFromEmail = (email: string): string => {
  return email.replace(/[^a-zA-Z0-9_-]/g, "_");
};
