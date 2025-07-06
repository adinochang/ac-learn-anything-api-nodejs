import { Request, Response } from 'express';
import { TopicSummaryRequestBody } from "../types/request.d.js"; 
import { OpenAIResponseCreateParams } from "../types/openai.d.js";
import openAIService from "@services/openai.service.js";
import {
  PROMPT_IDENTITY_TEACHER as PROMPT_IDENTITY,
  PROMPT_INSTRUCTION_TOPIC_SUMMARY,
} from "@config/prompts/index.js";

export const summary = async (
  req: Request<unknown, unknown, TopicSummaryRequestBody>,
  res: Response
) => {
  const { topic } = req.body;

  const summaryInstructions = `
    ${PROMPT_IDENTITY} 

    ${PROMPT_INSTRUCTION_TOPIC_SUMMARY} 
  `;

  if (!topic) {
    return res
      .status(400)
      .json({ status: "error", message: "Topic is required." });
  }

  const params: OpenAIResponseCreateParams = {
    instructions: summaryInstructions,
    input: `Give a short summary on the topic : ${topic}`,
  };

  const response = await openAIService.getChatCompletion(params);

  res.status(200).json({
    status: "success",
    message: `/summary output : ${topic} - ${response}`,
  });
};