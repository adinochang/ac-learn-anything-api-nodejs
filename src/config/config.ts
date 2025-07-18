import dotenv from 'dotenv';

dotenv.config();

interface Config {
  databaseUrl: string;
  jwtSecret: string;
  openAiKey: string;
  openAiDefaultModel: string;
  port: number;
}

const config: Config = {
  databaseUrl: process.env.DATABASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "",
  openAiKey: process.env.OPEN_AI_API_KEY || "",
  openAiDefaultModel: "gpt-4",
  port: parseInt(process.env.PORT || "3000", 10),
};

export default config;
