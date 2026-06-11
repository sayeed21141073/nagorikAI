# Nagorik AI - National Citizen Services Integration Platform

**Nagorik AI** is a unified citizen-facing AI assistant that seamlessly integrates the government services of Bangladesh. This project was built for the **Gemini API Developer Competition / XPRIZE Hackathon** hosted on Devpost.

## 🚀 The Problem
Government services are fragmented across hundreds of websites, offices, portals, and agencies. Citizens often struggle to find correct information, understand requirements, complete forms correctly, and track application status. This creates long processing times, unnecessary visits, high support burden, and frustration.

## 💡 Our Solution
Nagorik AI acts as a unified AI layer across all government services. It provides a conversational interface where citizens can ask questions in plain English or Bangla (e.g., *"How do I renew my passport?"* or *"My NID is lost. What should I do?"*) and receive accurate, official, step-by-step guidance instantly.

## ✨ Features
- **Citizen First:** Explains government services in simple, accessible language.
- **Official Sources Only:** Guides citizens through application processes, fees, and requirements using simulated official information.
- **Multilingual Support:** Understands and responds in English and Bangla.
- **Strict Guardrails:** Answers *only* questions related to Bangladesh government services (NID, Passports, Tax, Land, Utilities, Health, etc.). Politely declines off-topic or general knowledge queries.

## 🛠️ Tech Stack
* **Frontend:** React, Vite, Vanilla CSS
* **Icons & UI:** Lucide React, React Markdown
* **AI Engine:** Google Gemini 2.5 Flash (`gemini-2.5-flash`) via the `@google/generative-ai` SDK
* **Backend:** Vercel Serverless Functions (`api/chat.js`)
* **Hosting & Deployment:** Vercel

## 🧠 How it uses Gemini API
The application uses a React frontend to capture user queries and displays them in a chatbot interface. These queries are sent to a Vercel serverless function (`/api/chat.js`), which interacts directly with the **Gemini 2.5 Flash** model. 

We utilize Gemini's `systemInstruction` capabilities to initialize a robust `SYSTEM_PROMPT` that strictly defines its persona as the *National Citizen Services Integration Platform for Bangladesh*. It enforces guidelines such as relying only on official sources, providing step-by-step guidance in Markdown, and safely handling out-of-bounds requests.

## ⚙️ Local Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables by creating a `.env.local` file with your Gemini API Key:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## 🗺️ Future Roadmap
- Integration with live national API portals (e.g., Bangladesh National Digital Architecture e-Service Bus).
- Voice interaction for low-literacy and visually impaired users.
- Regional dialect support across Bangladesh.
