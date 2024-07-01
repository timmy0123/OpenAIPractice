import { GoogleGenerativeAI } from "@google/generative-ai";
import { TiktokenModel, encoding_for_model } from "tiktoken";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

if (!process.env.Gemini_API_KEY) {
  throw new Error("Gemini_API_KEY is not set");
}
const gemineAI = new GoogleGenerativeAI(process.env.Gemini_API_KEY);

async function main() {
  const model = gemineAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = "請給我使用 gemini-pro 而不是 gpt-4o 的理由";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  console.log(text);
}

function encodingPrompt(model: TiktokenModel, prompt: string) {
  const encoding = encoding_for_model(model);
  const tokens = encoding.encode(prompt);
  console.log(tokens);
}

encodingPrompt("gpt-3.5-turbo", "請給我使用 gemini-pro 而不是 gpt-4o 的理由");
