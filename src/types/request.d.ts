import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core"; 
import { JwtPayload } from "jsonwebtoken";

export interface CreateUserRequestBody {
  email: string;
  name: string;
  password: string;
}

export interface GetUserRequestParams {
  userId: number;
}

export interface CreateTopicRequestBody {
  topic: string;
  description: string;
}

export interface GetTopicRequestParams extends ParamsDictionary {
  topicId: number;
}

export interface TopicSummaryRequestBody {
  topic: string;
}

export enum TopicLearningPathProficiency {
  Beginner = "beginner",
  Intermediate = "intermediate",
  Expert = "expert",
}

export interface TopicLearningPathRequestBody {
  topic: string;
  proficiency: TopicLearningPathProficiency;
}

export interface TestApiRequestBody {
  question: string;
}

export interface TestApiRequestBodybb {
  question: string;
}

export interface AuthenticatedRequest<
  P = ParamsDictionary | GetTopicRequestParams,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ResBody = any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ReqBody = any,
  ReqQuery = ParsedQs
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  authenticatedUser: {
    id: number;
  };
}

export interface AuthenticatedJwtPayload extends JwtPayload {
  userId?: number;
}