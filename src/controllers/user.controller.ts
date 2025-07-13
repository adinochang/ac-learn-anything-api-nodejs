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

  const existingUser: UserRecord | undefined = await userRepository.findByEmail(
    email
  );

  if (existingUser) {
    return res
      .status(400)
      .json({ status: "error", message: "User already exists." });
  }

  const hashedPassword = await hashPassword(password);

  const newUser: UserRecord | undefined = await userRepository.create({
    userName: name,
    email: email,
    hashedPassword: hashedPassword,
    createdAt: new Date(),
  });

  if (!newUser) {
    return res
      .status(400)
      .json({ status: "error", message: "User not created." });
  } else {
    res.status(201).json(newUser);
  }
};

export const getUserById = async (
  req: Request<GetUserRequestParams>,
  res: Response
) => {
  const { userId } = req.params;
  const userIdCheck = Number(userId);

  if (Number.isNaN(userIdCheck) || !Number.isFinite(userIdCheck)) {
    return res
      .status(400)
      .json({ status: "error", message: "Input is not a valid ID." });
  }

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

  const existingUser: UserRecord | undefined = await userRepository.findByEmail(
    email
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
      userId: existingUser.userId,
      userName: existingUser.userName,
      email: existingUser.email,
      createdAt: existingUser.createdAt,
    });
  }
};
