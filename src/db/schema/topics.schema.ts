// Need to import all data types we want to use
import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

// Define table schemas
export const topics = pgTable("topics", {
  topicId: serial("topic_id").primaryKey(),
  topic: text("topic").notNull(),
  description: text("description").notNull(),
  status: integer("status").notNull().default(1),
});

// Type inference for Drizzle queries so we can use it outside this file without TS type errors
export type TopicInsert = typeof topics.$inferInsert;
export type TopicSelect = typeof topics.$inferSelect;
