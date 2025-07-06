import express from "express";
import * as topicController from "@controllers/topic.controller.js";

const router = express.Router();

router.post("/summary", topicController.summary);

export default router;
