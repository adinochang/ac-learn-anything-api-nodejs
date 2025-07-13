import express from "express";
import * as userController from "@controllers/user.controller.js";
import { validateCreateUser } from "@middlewares/user.validation.js";

const router = express.Router();

router.post("/create", validateCreateUser, userController.create);

router.get("/:userId", userController.getUserById);

export default router;
