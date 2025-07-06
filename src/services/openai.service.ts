import OpenAI from "openai";
import {
  OpenAIResponse,
  OpenAIResponseCreateParams,
} from "../types/openai.js";
import config from "@config/config.js";

const openAI = new OpenAI({
  apiKey: config.openAiKey,
});

class OpenAIService {
  defaultModel: string = "gpt-4";

  async getChatCompletion(
    createResponseParams: OpenAIResponseCreateParams
  ): Promise<string> {
    try {
      if (!createResponseParams.model) {
        createResponseParams.model = config.openAiDefaultModel;
      }

      const response: OpenAIResponse = await openAI.responses.create(
        createResponseParams
      );

      if (!response || !response.output_text) {
        throw new Error("OpenAI API returned no content.");
      }

      return response.output_text;
    } catch (error: unknown) {
      // Log the original error for debugging
      console.error("Error calling OpenAI API:", error);
    }
    return "test";
  }
}

// Export an instance of the service so it's a singleton
export default new OpenAIService();