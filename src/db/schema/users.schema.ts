// Need to import all data types we want to use
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Define table schemas
export const users = pgTable("users", {
  userId: serial("user_id").primaryKey(),
  userName: text("name").notNull(),
  email: text("email").notNull(),
  hashedPassword: text("hashed_password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Type inference for Drizzle queries so we can use it outside this file without TS type errors
export type UserInsert = typeof users.$inferInsert;
export type UserSelect = typeof users.$inferSelect;