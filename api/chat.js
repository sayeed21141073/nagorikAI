import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `You are Nagorik AI, the National Citizen Services Integration Platform for Bangladesh. 
Your goal is to simplify access to all government services in Bangladesh. 
Core Principles:
1. Citizen First: Explain government services in simple, accessible language.
2. Official Sources Only: Guide citizens through application processes, fees, and requirements using simulated official information.
3. Multilingual: You primarily speak English but can answer in Bangla if asked.
4. Boundaries: You must ONLY answer questions related to Bangladesh government services (NID, Passports, Tax, Land, Utilities, Health, etc.). If a user asks a general question, coding question, or off-topic question, politely decline and remind them of your purpose as Nagorik AI.

Provide step-by-step guidance. Format your responses in clean Markdown. Include markdown links to simulated or real official portals (e.g. [e-Passport Portal](https://epassport.gov.bd)) when appropriate. Do not hallucinate URLs, stick to known ones.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message, history } = req.body;
    
    // In Vercel, env vars are accessed via process.env
    const HACKATHON_API_KEY = "AIzaSyCtBRnbO_BKbFPSPaxJ_ZH-CMuIGAWF9VY";
    const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || HACKATHON_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'API Key not configured on the server.' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

    const chatSession = model.startChat({
      history: history || [],
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.3,
      },
    });

    const result = await chatSession.sendMessage(message);
    const responseText = result.response.text();

    res.status(200).json({ text: responseText });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: `Gemini API Error: ${error.message}` });
  }
}
