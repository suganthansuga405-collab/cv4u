
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const enhanceTextWithAI = async (prompt: string, textToEnhance: string): Promise<string> => {
  if (!textToEnhance.trim()) {
    return "";
  }
  
  const fullPrompt = `${prompt}:\n\n"${textToEnhance}"`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error enhancing text with AI:", error);
    // In a real app, you might want to show a user-friendly error message.
    return "Error generating text. Please try again.";
  }
};
