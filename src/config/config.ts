import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  openAiKey: string;
}

const config: Config = {
  port: parseInt(process.env.PORT || "3000", 10),
  openAiKey: process.env.OPEN_AI_API_KEY || "",
};

export default config;
