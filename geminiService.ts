
import { GoogleGenAI, Type } from "@google/genai";

export const analyzeTMATTrends = async (data: any[]) => {
  try {
    // Create a new instance right before the API call to ensure the latest API key is used
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analisis data sensor TMAT ini: ${JSON.stringify(data)}. Berikan ringkasan eksekutif, skor risiko, identifikasi anomali, dan skor metrik radar.`,
      config: {
        responseMimeType: "application/json",
        // Using responseSchema for better structured output as per guidelines
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: "Satu kalimat ringkasan kondisi keseluruhan",
            },
            riskScore: {
              type: Type.NUMBER,
              description: "Skor risiko antara 0-100",
            },
            anomalies: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  sensorId: { type: Type.STRING },
                  issue: { type: Type.STRING },
                  level: { type: Type.STRING, description: "critical atau warning" },
                },
                required: ["sensorId", "issue", "level"],
              },
            },
            radarScores: {
              type: Type.ARRAY,
              items: { type: Type.NUMBER },
              description: "Array angka 0-100 untuk [kekeringan, kebakaran, evaporasi, anomali, konektivitas]",
            }
          },
          required: ["summary", "riskScore", "anomalies", "radarScores"],
        },
      }
    });

    // Directly access text property from response
    const jsonStr = response.text || "{}";
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      summary: "Gagal memproses data otomatis.",
      riskScore: 50,
      anomalies: [],
      radarScores: [50, 50, 50, 50, 50]
    };
  }
};
