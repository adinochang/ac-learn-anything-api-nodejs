import { Request, Response } from 'express';
import { CreateUserRequestBody } from "../types/request.d.js";
import { userRepository } from "@repositories/user.repository.js";


export const create = async (
  req: Request<unknown, unknown, CreateUserRequestBody>,
  res: Response
) => {
  const { email, name, password } = req.body;

  const userId = email.replace(/[^a-zA-Z0-9_-]/g, "_");

  const existingUser = await userRepository.findById(userId);

  if (!existingUser) {
    console.log(`User ${userId} not found. Creating user`);

    await userRepository.create({
      userId: userId,
      userName: name,
      email: email,
      hashedPassword: password,
      createdAt: new Date(),
    });
  }

  res.status(200).json({ email, name });
};
