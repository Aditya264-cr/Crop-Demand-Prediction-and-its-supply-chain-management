import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getAgriInsights(context: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an expert agricultural AI assistant for AgriSense Horizon. 
      Based on the following data: ${context}, provide a detailed analysis for a farmer.
      Keep it professional, encouraging, and simple.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "A concise 1-sentence overview" },
            weatherFactor: { type: Type.STRING, description: "How upcoming weather affects this crop specifically" },
            weatherAlert: { type: Type.STRING, description: "Any immediate weather warnings like heavy rain or drought risk, or 'None' if clear" },
            demandFactor: { type: Type.STRING, description: "Regional demand shifts or market trends influencing the price" },
            actionableTip: { type: Type.STRING, description: "One specific thing the farmer should do right now" }
          },
          required: ["summary", "weatherFactor", "weatherAlert", "demandFactor", "actionableTip"]
        }
      }
    });
    const data = JSON.parse(response.text || "{}");
    return {
      summary: String(data.summary || ""),
      weatherFactor: String(data.weatherFactor || ""),
      weatherAlert: String(data.weatherAlert || "None"),
      demandFactor: String(data.demandFactor || ""),
      actionableTip: String(data.actionableTip || "")
    };
  } catch (error) {
    console.error("Error fetching AI insights:", error);
    return {
      summary: "Stay updated with market trends for better profits.",
      weatherFactor: "Monitor local forecasts for sudden changes.",
      weatherAlert: "None",
      demandFactor: "Market demand remains stable for major crops.",
      actionableTip: "Check regional mandi prices daily."
    };
  }
}
