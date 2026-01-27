
import { GoogleGenAI, Type, Modality } from "@google/genai";

// Create instances just-in-time for latest key availability
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const safetyChat = async (history: any[], message: string) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: "You are the Street Dog Defender AI assistant. You help users understand street dog behavior, safety protocols, and how our wearable device works. Be professional, empathetic, and data-driven.",
    },
  });
  
  const result = await chat.sendMessage({ message });
  return result.text;
};

export const findNearbySafeZones = async (lat: number, lng: number) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Find the 3 nearest 24/7 government hospitals with Anti-Rabies Vaccine (ARV) in this area. Provide details.",
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: {
          latLng: { latitude: lat, longitude: lng }
        }
      }
    },
  });
  return {
    text: response.text,
    grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks
  };
};

export const visualizeSafety = async (imageBase64: string, prompt: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: imageBase64, mimeType: 'image/png' } },
        { text: `Edit this photo to show a safe urban environment: ${prompt}. Add bright street lights, a 'Street Dog Defender Smart Pole', and clean walking paths.` }
      ]
    }
  });
  
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
  }
  throw new Error("No image generated");
};

export const generateSafetyVideo = async (imageBase64: string) => {
  const ai = getAI();
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: 'A cinematic 16:9 walk-through of a safe school zone with smart deterrent poles active and children walking safely.',
    image: {
      imageBytes: imageBase64,
      mimeType: 'image/png',
    },
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: '16:9'
    }
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }
  
  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  return `${downloadLink}&key=${process.env.API_KEY}`;
};
