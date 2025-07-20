export enum TopicStatus {
  Inactive = 0,
  Active = 1,
}

export enum TopicLevel {
  Beginner = 10,
  Intermediate = 20,
  Advanced = 30,
}

export interface TopicRecord {
  topicId: number;
  userId: number;
  topic: string;
  description: string;
  status: TopicStatus;
  level: TopicLevel;
}