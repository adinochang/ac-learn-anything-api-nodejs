import express from "express";
import * as topicController from "@controllers/topic.controller.js";

const router = express.Router();

router.post("/summary", topicController.summary);

router.post("/learning-path", topicController.learningPath);

router.post("/key-words", topicController.keyWords);

export default router;
