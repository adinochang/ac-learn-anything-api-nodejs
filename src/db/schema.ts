// Export individual schemas so drizzle-kit can detect them
export * from "./schema/users.schema";

// Import individual schemas to combine them in a single schema for app usage
import * as usersSchema from "./schema/users.schema";

// Define table schemas
export const schema = {
  ...usersSchema,
};

/*
In terminal, run :
- npx drizzle-kit generate -> to create a migration sql file
- npx drizzle-kit migrate -> to execute the sql
*/
