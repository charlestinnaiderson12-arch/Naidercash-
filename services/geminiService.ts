
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getFinancialAdvice = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: `Ou se yon konseye finansye entèlijan pou NAIDERCASH. 
        NAIDERCASH se yon platfòm ki bay kat vityèl, fizik ak transfè entènasyonal. 
        Ou dwe reponn an Kreyòl Ayisyen sèlman. Repons ou yo dwe kout, pwofesyonèl, epi ede itilizatè a konprann kijan pou yo jere lajan yo pi byen.`
      }
    });
    return response.text || "Padon, mwen pa kapab reponn pou kounye a.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Yon erè rive pandan m t ap chèche repons lan.";
  }
};
