import { db } from "@config/database.js";
import { topics, TopicSelect, TopicInsert } from "@schemas/topics.schema.js";
import { TopicRecord } from "@models/topic.js";
import { eq, and } from "drizzle-orm";

class TopicRepository {
  async findById(topicId: number): Promise<TopicRecord | undefined> {
    const result = await db
      .select()
      .from(topics)
      .where(eq(topics.topicId, topicId))
      .limit(1);

    return result[0];
  }

  async findByIdAndUserId(
    topicId: number,
    userId: number
  ): Promise<TopicRecord | undefined> {
    const result = await db
      .select()
      .from(topics)
      .where(and(eq(topics.topicId, topicId), eq(topics.userId, userId)))
      .limit(1);

    return result[0];
  }

  async findByTopic(topic: string): Promise<TopicRecord | undefined> {
    const result = await db
      .select()
      .from(topics)
      .where(eq(topics.topic, topic))
      .limit(1);

    return result[0];
  }

  async create(topicData: TopicInsert): Promise<TopicRecord> {
    const newTopic: TopicSelect[] = await db
      .insert(topics)
      .values(topicData)
      .returning();

    return newTopic[0];
  }

  async update(topicData: TopicInsert): Promise<TopicRecord> {
    const updatedTopic: TopicSelect[] = await db
      .update(topics)
      .set({
        topic: topicData.topic,
        description: topicData.description,
        status: topicData.status,
        level: topicData.level,
      })
      .where(
        and(
          eq(topics.topicId, topicData.topicId || 0),
          eq(topics.userId, topicData.userId)
        )
      )
      .returning();

    return updatedTopic[0];
  }
};

export const topicRepository = new TopicRepository();