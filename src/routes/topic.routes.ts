import express from "express";
import * as topicController from "@controllers/topic.controller.js";
import {
  validateCreateTopic,
  validateUpdateTopic,
} from "@middlewares/topic.validation.js";
import { authenticateJwtToken } from "@middlewares/token.validation.js";

const router = express.Router();

router.post(
  "/create",
  authenticateJwtToken,
  validateCreateTopic,
  topicController.create
);

router.get("/:topicId", authenticateJwtToken, topicController.getTopicById);

router.put(
  "/:topicId",
  authenticateJwtToken,
  validateUpdateTopic,
  topicController.update
);

router.post("/summary", topicController.summary);

router.post("/learning-path", topicController.learningPath);

router.post("/key-words", topicController.keyWords);

export default router;
