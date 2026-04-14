import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getAgriInsights(context: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an expert agricultural AI assistant for AgriSense Horizon. 
      Based on the following data: ${context}, provide a concise, actionable insight for a farmer. 
      Focus on crop selling, demand prediction, or resource management. 
      Keep it professional, encouraging, and simple.`,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching AI insights:", error);
    return "Stay updated with market trends for better profits.";
  }
}
