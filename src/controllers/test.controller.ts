import { Request, Response } from 'express';
import { TestApiRequestBody } from '../types/request.d.js'; 
import openAIService from "@services/openai.service.js";


export const testApi = async (
  req: Request<unknown, unknown, TestApiRequestBody>,
  res: Response
) => {
  const { question } = req.body;

  if (!question) {
    return res
      .status(400)
      .json({ status: "error", message: "Question is required." });
  }

  const response = await openAIService.getChatCompletion(question);

  res.status(200).json({
    status: "success",
    message: `Test received successfully - ${question} - ${response}`,
  });
};