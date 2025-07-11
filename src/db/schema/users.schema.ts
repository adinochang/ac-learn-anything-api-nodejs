// Need to import all data types we want to use
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

// Define table schemas
export const users = pgTable("users", {
  userId: text("user_id").primaryKey(),
  userName: text("name").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});