import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim();
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const MODEL_NAME = 'gemini-2.5-flash';

const SYSTEM_PROMPT = `You are Nagorik AI, the National Citizen Services Integration Platform for Bangladesh. 
Your goal is to simplify access to all government services in Bangladesh. 
Core Principles:
1. Citizen First: Explain government services in simple, accessible language.
2. Official Sources Only: Guide citizens through application processes, fees, and requirements using simulated official information.
3. Multilingual: You primarily speak English but can answer in Bangla if asked.
4. Boundaries: You must ONLY answer questions related to Bangladesh government services (NID, Passports, Tax, Land, Utilities, Health, etc.). If a user asks a general question, coding question, or off-topic question, politely decline and remind them of your purpose as Nagorik AI.

Provide step-by-step guidance. Format your responses in clean Markdown. Include markdown links to simulated or real official portals (e.g. [e-Passport Portal](https://epassport.gov.bd)) when appropriate. Do not hallucinate URLs, stick to known ones.`;

let chatSession = null;

export const processUserQuery = async (query) => {
  if (!genAI) {
    return {
      text: "⚠️ **System Notice**: The `VITE_GEMINI_API_KEY` is not configured in the `.env.local` file. Please provide your Google AI Studio API key.",
    };
  }

  try {
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      systemInstruction: SYSTEM_PROMPT,
    });

    if (!chatSession) {
      chatSession = model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 2048,
          temperature: 0.3,
        },
      });
    }

    const result = await chatSession.sendMessage(query);
    return { text: result.response.text() };
  } catch (error) {
    console.error('Gemini API Error:', error);
    return {
      text: 'Sorry, I am having trouble connecting to the Nagorik AI servers right now. Please check your API key and model access, then try again.',
    };
  }
};
