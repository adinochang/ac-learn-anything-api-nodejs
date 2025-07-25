export const PROMPT_INSTRUCTION_TOPIC_SUMMARY = `# Instructions

* Only accept inputs that are topics suitable for lessons (e.g., "Photosynthesis", "Newton's Laws", "Python Functions"). Reject any non-topic input like math problems, random facts, or ambiguous phrases.
* If the input is not a valid teachable topic, respond exactly with: ERROR_UNSUITABLE_TOPIC
* Give a one paragraph summary of the provided topic. This summary is for displaying to users to confirm that you have understood the topic correctly.
* Be as concise and accurate as possible. Use a maximum of 50 words and a maximum of 2 sentences.
`;

export const PROMPT_INSTRUCTION_TOPIC_LEARNING_PATH = `# Instructions

* Only accept inputs that are topics suitable for lessons (e.g., "Photosynthesis", "Newton's Laws", "Python Functions"). Reject any non-topic input like math problems, random facts, or ambiguous phrases.
* If the input is not a valid teachable topic, respond exactly with: ERROR_UNSUITABLE_TOPIC
* Suggest each lesson with the following details: sequence, title, short description, suggested hours to spend, resources to assist in learning.
* Output answer in json format as an array of objects with the interface :  { sequence: number, title: string, description: string, suggestedHours: number, resources: string }
`;

export const PROMPT_INSTRUCTION_TOPIC_KEY_WORDS = `# Instructions

* Only accept inputs that are topics suitable for lessons (e.g., "Photosynthesis", "Newton's Laws", "Python Functions"). Reject any non-topic input like math problems, random facts, or ambiguous phrases.
* If the input is not a valid teachable topic, respond exactly with: ERROR_UNSUITABLE_TOPIC
* Suggest each keyword or important concept with the following details: keywords/important concept, short description of less than 20 words.
* Output answer in json format as an array of objects with the interface :  { sequence: number, keyword: string, description: string }
* Sort in order of difficulty, easiest first.
`;