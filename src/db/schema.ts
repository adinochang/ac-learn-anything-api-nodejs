// Export individual schemas so drizzle-kit can detect them
export * from "./schema/users.schema";
export * from "./schema/topics.schema";

// Import individual schemas to combine them in a single schema for app usage
import * as usersSchema from "./schema/users.schema";
import * as topicsSchema from "./schema/topics.schema";

// Define table schemas
export const schema = {
  ...usersSchema,
  ...topicsSchema,
};

/*
In terminal, run :
- npx drizzle-kit generate -> to create a migration sql file
- npx drizzle-kit migrate -> to execute the sql
*/
