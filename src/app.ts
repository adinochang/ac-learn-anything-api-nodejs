import express, { Application /*, Request, Response, NextFunction*/ } from "express";
import cors from "cors";

// import apiRoutes from "@routes/index";

const app: Application = express();

// middleware
app.use(express.json()); // parse JSON payloads
app.use(express.urlencoded({ extended: false })); // format url encoded forms into objects

app.use(cors());

// routes
// app.use("/api", apiRoutes);

// app.use((err: unknown, req: Request, res: Response) => {
//   console.error(err.stack);
//   res.status(err.statusCode || 500).send({
//     status: "error",
//     message: err.message || "Something went wrong!",
//   });
// });

export default app;
