import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import config from "@config/config.js";

if (!config.databaseUrl) {
  throw new Error("DATABASE_URL is undefined");
}

// Init Neon client
const sqlClient = neon(config.databaseUrl);

// Init Drizzle ORM
export const db = drizzle(sqlClient);
