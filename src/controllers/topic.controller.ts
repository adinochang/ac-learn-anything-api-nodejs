import { Request, Response } from 'express';
import {
  TopicSummaryRequestBody,
  TopicLearningPathRequestBody,
  TopicLearningPathProficiency,
} from "../types/request.d.js";
import { OpenAIResponseCreateParams } from "../types/openai.d.js";
import openAIService from "@services/openai.service.js";
import {
  PROMPT_IDENTITY_TEACHER as PROMPT_IDENTITY,
  PROMPT_INSTRUCTION_TOPIC_SUMMARY,
  PROMPT_INSTRUCTION_TOPIC_LEARNING_PATH,
} from "@config/prompts/index.js";
import { log } from "console";

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

export const learningPath = async (
  req: Request<unknown, unknown, TopicLearningPathRequestBody>,
  res: Response
) => {
  const { topic, proficiency } = req.body;

  const learningPathInstructions = `
    ${PROMPT_IDENTITY} 

    ${PROMPT_INSTRUCTION_TOPIC_LEARNING_PATH} 
  `;

  if (!topic) {
    return res
      .status(400)
      .json({ status: "error", message: "Topic is required." });
  }

  if (!Object.values(TopicLearningPathProficiency).includes(proficiency)) {
    return res
      .status(400)
      .json({ status: "error", message: "A valid proficiency is required." });
  }

  const params: OpenAIResponseCreateParams = {
    instructions: learningPathInstructions,
    input: `Provide a learning path in 10-15 lessons on the topic : ${topic}. The user has a proficiency level of ${proficiency} in the topic.`,
  };

  const response = await openAIService.getChatCompletion(params);

  console.log(response);

  res.status(200).json({
    status: "success",
    message: `/learning-path output : ${topic} ${proficiency}`,
  });
};