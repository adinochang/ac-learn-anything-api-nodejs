import OpenAI from "openai";
import {
  OpenAIResponse,
  OpenAIResponseOutputItem,
  OpenAIResponseOutputText,
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

      if (!response || !response.output) {
        throw new Error("OpenAI API returned no content.");
      }

      const responseOutputItem: OpenAIResponseOutputItem = response.output[0];

      if (!responseOutputItem || !responseOutputItem.content) {
        throw new Error("OpenAI API returned no content.");
      }

      const responseOutputText: OpenAIResponseOutputText =
        responseOutputItem.content[0];

      if (!responseOutputText) {
        throw new Error("OpenAI API returned no content.");
      }

      const responseText = responseOutputText.text;

      if (!responseText) {
        throw new Error("OpenAI API returned no content.");
      }

      return responseText;
    } catch (error: unknown) {
      // Log the original error for debugging
      console.error("Error calling OpenAI API:", error);
    }
    return "test";
  }
}

// Export an instance of the service so it's a singleton
export default new OpenAIService();