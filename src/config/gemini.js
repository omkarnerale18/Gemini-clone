import { GoogleGenerativeAI } from "@google/generative-ai"

const MODEL_NAME = 'gemini-1.5-flash';
const API_KEY = "YOUR_API_KEY";

async function runChat(prompt) {
    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Gemini API error:', error);
        throw error;
    }
}

export default runChat;
