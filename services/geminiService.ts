import { GoogleGenAI } from "@google/genai";

export const generateText = async (prompt: string, history: {role: string, parts: string[]}[] = []) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are Nexus AI, an elite assistant embedded in a futuristic AI tools dashboard. Be concise, professional, and helpful.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Text Gen Error:", error);
    throw error;
  }
};

export const generateCode = async (prompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Using flash for speed in coding demo
      contents: `Write code for: ${prompt}. Return only the code within markdown code blocks.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Code Gen Error:", error);
    throw error;
  }
};

export const generateImage = async (prompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    // Using imagen-4.0 as requested for high quality
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        aspectRatio: '1:1',
        outputMimeType: 'image/jpeg',
      }
    });
    
    // Extract base64 and return data URI
    const base64Image = response.generatedImages[0].image.imageBytes;
    return `data:image/jpeg;base64,${base64Image}`;
  } catch (error) {
    console.error("Gemini Image Gen Error:", error);
    // Fallback to text description if Image model fails or isn't enabled on key
    return null;
  }
};