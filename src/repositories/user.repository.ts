import { db } from "@config/database.js";
import { users } from "@schemas/users.schema.js";
import { UserRecord } from "@models/user.js";
import { eq } from "drizzle-orm";

class UserRepository {
  async findById(userId: string): Promise<UserRecord | undefined> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.userId, userId))
      .limit(1);

    return result[0];
  }

  async create(userData: UserRecord): Promise<void> {
    await db.insert(users).values(userData);
  }
}

export const userRepository = new UserRepository();