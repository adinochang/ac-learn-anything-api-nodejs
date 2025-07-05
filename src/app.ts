import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";

import apiRoutes from "@routes/index.js";
import { CustomError } from "./types/error.js";

const app: Application = express();

// middleware
app.use(express.json()); // parse JSON payloads
app.use(express.urlencoded({ extended: false })); // format url encoded forms into objects
app.use(cors());

// routes
app.use("/api", apiRoutes);

app.use((_req: Request, _res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${_req.originalUrl}`);

  (error as CustomError).statusCode = 404;
  next(error);
});

app.use(
  (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).send({
      status: "error",
      message: err.message || "Something went wrong!",
    });
  }
);

export default app;
