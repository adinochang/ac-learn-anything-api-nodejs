enum TopicStatus {
  Inactive = 0,
  Active = 1,
}

export interface TopicRecord {
  topicId: number;
  topic: string;
  description: string;
  status: TopicStatus;
}