const { OpenAI } = require("openai");

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY || "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",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "StudyNotion Platform", 
  }
});

const models = [
  "google/gemini-2.0-flash-exp:free",
  "meta-llama/llama-3-8b-instruct:free",
  "mistralai/mistral-7b-instruct:free",
  "openrouter/auto"
];

async function run() {
  for (const model of models) {
    try {
      const res = await openai.chat.completions.create({
        model: model,
        messages: [{ role: "user", content: "Hi" }],
      });
      console.log("SUCCESS_MODEL=" + model);
      return;
    } catch (e) {
      console.log("FAIL_MODEL=" + model + " MSG=" + e.message);
    }
  }
  console.log("ALL_FAILED");
}
run();
