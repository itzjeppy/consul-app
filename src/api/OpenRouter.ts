import axios from 'axios';

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function openRouterChat(prompt: string, model = "openai/gpt-3.5-turbo") {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OpenRouter API key missing");

  const response = await axios.post(
    OPENROUTER_URL,
    {
      model,
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
}