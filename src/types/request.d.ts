export interface CreateUserRequestBody {
  email: string;
  name: string;
  password: string;
}

export interface GetUserRequestParams {
  userId: string;
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
