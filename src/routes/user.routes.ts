import express from "express";
import * as userController from "@controllers/user.controller.js";
import {
  validateCreateUser,
  validateLogin,
} from "@middlewares/user.validation.js";

const router = express.Router();

router.post("/create", validateCreateUser, userController.create);

router.get("/:userId", userController.getUserById);

router.post("/login", validateLogin, userController.login);

export default router;
