import { Request, Response } from 'express';
import {
  AuthenticatedRequest,
  CreateTopicRequestBody,
  GetTopicRequestParams,
  TopicSummaryRequestBody,
  TopicLearningPathRequestBody,
  TopicLearningPathProficiency,
} from "../types/request.d.js";
import { TopicRecord } from "@models/topic.js";
import { topicRepository } from "@repositories/topic.repository.js";
import { OpenAIResponseCreateParams } from "../types/openai.d.js";
import openAIService from "@services/openai.service.js";
import {
  PROMPT_IDENTITY_TEACHER as PROMPT_IDENTITY,
  PROMPT_INSTRUCTION_TOPIC_SUMMARY,
  PROMPT_INSTRUCTION_TOPIC_LEARNING_PATH,
  PROMPT_INSTRUCTION_TOPIC_KEY_WORDS,
} from "@config/prompts/index.js";

export const create = async (
  req: Request<unknown, CreateTopicRequestBody>,
  res: Response
) => {
  const { topic, description } = req.body;

  const newTopic: TopicRecord | undefined = await topicRepository.create({
    topic: topic,
    description: description,
  });

  if (!newTopic) {
    return res
      .status(400)
      .json({ status: "error", message: "Topic not created." });
  } else {
    res.status(201).json(newTopic);
  }
};

export const getTopicById = async (
  req: Request<GetTopicRequestParams>,
  res: Response
) => {
  const { topicId } = req.params;
  const topicIdCheck = Number(topicId);
  const userId = (req as AuthenticatedRequest).authenticatedUser.id;
  
  if (Number.isNaN(topicIdCheck) || !Number.isFinite(topicIdCheck)) {
    return res
      .status(400)
      .json({ status: "error", message: "Input is not a valid ID." });
  }

  if (Number.isNaN(userId) || !Number.isFinite(userId)) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid User ID." });
  }

  const existingTopic: TopicRecord | undefined = await topicRepository.findById(
    topicId
  );

  if (!existingTopic) {
    return res
      .status(400)
      .json({ status: "error", message: "Topic not found." });
  } else {
    res.status(201).json({
      topicId: topicId,
      topic: existingTopic.topic,
      description: existingTopic.description,
      status: existingTopic.status,
    });
  }
};

export const update = async (req: Request, res: Response) => {
  const { topicId } = req.params;
  const topicIdInt = Number(topicId);

  if (Number.isNaN(topicIdInt) || !Number.isFinite(topicIdInt)) {
    return res.status(400).json({
      status: "error",
      message: `Input [${topicId}] is not a valid ID.`,
    });
  }

  const existingTopic: TopicRecord | undefined = await topicRepository.findById(
    topicIdInt
  );

  if (!existingTopic) {
    return res
      .status(400)
      .json({ status: "error", message: "Topic not found." });
  } else {
    const { topic, description, status } = req.body;

    const updatedTopic: TopicRecord | undefined = await topicRepository.update({
      topicId: topicIdInt,
      topic: topic,
      description: description,
      status: status,
    });

    res.status(201).json({
      topicId: topicIdInt,
      topic: updatedTopic.topic,
      description: updatedTopic.description,
      status: updatedTopic.status,
    });
  }
};

export const summary = async (
  req: Request<unknown, TopicSummaryRequestBody>,
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
  req: Request<unknown, TopicLearningPathRequestBody>,
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

export const keyWords = async (
  req: Request<unknown, TopicLearningPathRequestBody>,
  res: Response
) => {
  const { topic, proficiency } = req.body;

  const learningPathInstructions = `
    ${PROMPT_IDENTITY} 

    ${PROMPT_INSTRUCTION_TOPIC_KEY_WORDS} 
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
    input: `Provide 10-20 of the most common terms or critical concepts about the topic jazz : ${topic}. The user has a proficiency level of ${proficiency} in the topic.`,
  };

  const response = await openAIService.getChatCompletion(params);

  console.log(response);

  res.status(200).json({
    status: "success",
    message: `/key-words output : ${topic} ${proficiency}`,
  });
};