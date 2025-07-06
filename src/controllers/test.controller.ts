import { Request, Response } from 'express';
import { TestApiRequestBody } from '../types/request.d.js'; 
import { OpenAIResponseCreateParams } from "../types/openai.d.js";
import openAIService from "@services/openai.service.js";
import { PROMPT_IDENTITY_TEACHER as PROMPT_IDENTITY } from "@config/prompts/index.js";

export const testApi = async (
  req: Request<unknown, unknown, TestApiRequestBody>,
  res: Response
) => {
  const { question } = req.body;

  const testInstructions = `${PROMPT_IDENTITY}`;

  if (!question) {
    return res
      .status(400)
      .json({ status: "error", message: "Question is required." });
  }

  const params: OpenAIResponseCreateParams = {
    instructions: testInstructions,
    input: question,
  };

  const response = await openAIService.getChatCompletion(params);

  res.status(200).json({
    status: "success",
    message: `Test received successfully - ${question} - ${response}`,
  });
};