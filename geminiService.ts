
import { GoogleGenAI, Type } from "@google/genai";
import { GeodeResult } from "../types";

export const analyzeGeode = async (): Promise<GeodeResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate a fictional, sci-fi alien mineral found inside a geode. Give it a cool name, a 1-sentence lore description, a gold value between 800 and 15000, and a rarity level (Common, Rare, Epic, Legendary).",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            value: { type: Type.INTEGER },
            rarity: { type: Type.STRING, enum: ["Common", "Rare", "Epic", "Legendary"] },
          },
          required: ["name", "description", "value", "rarity"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as GeodeResult;
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    // Return a stable fallback
    return {
      name: "Stardust Fragment",
      description: "A residual spark from an ancient supernova, vibrating with raw energy.",
      value: 500,
      rarity: "Common"
    };
  }
};
