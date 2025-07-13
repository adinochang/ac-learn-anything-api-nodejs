import { db } from "@config/database.js";
import { users, UserSelect, UserInsert } from "@schemas/users.schema.js";
import { UserRecord } from "@models/user.js";
import { eq } from "drizzle-orm";

class UserRepository {
  async findById(userId: number): Promise<UserRecord | undefined> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.userId, userId))
      .limit(1);

    return result[0];
  }

  async findByEmail(email: string): Promise<UserRecord | undefined> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return result[0];
  }

  async create(userData: UserInsert): Promise<UserRecord> {
    const newUser: UserSelect[] = await db
      .insert(users)
      .values(userData)
      .returning();

    return newUser[0];
  }
};

export const userRepository = new UserRepository();