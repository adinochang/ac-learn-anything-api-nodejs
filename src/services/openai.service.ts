import OpenAI from "openai";
import {
  OpenAIResponse,
  OpenAIResponseOutputItem,
  OpenAIResponseOutputText,
} from "../types/openai.js";
import config from "@config/config.js";


const openAI = new OpenAI({
  apiKey: config.openAiKey
});

class OpenAIService {
  async getChatCompletion(
    prompt: string,
    model: string = "gpt-4"
  ): Promise<string> {
    try {
        const response: OpenAIResponse = await openAI.responses.create({
        model: model,
        input: prompt,
        });

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