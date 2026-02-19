// import { GoogleGenAI, Type } from "@google/genai";

// // Always use the process.env.API_KEY directly for initialization as per guidelines.
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// export const generateQuizFromTopic = async (topic: string) => {
//   const response = await ai.models.generateContent({
//     model: "gemini-3-flash-preview",
//     contents: `Generate a 5-question multiple choice quiz about: ${topic}. Each question must have exactly 4 options and 1 correct answer (0-indexed).`,
//     config: {
//       responseMimeType: "application/json",
//       responseSchema: {
//         type: Type.OBJECT,
//         properties: {
//           title: { type: Type.STRING },
//           questions: {
//             type: Type.ARRAY,
//             items: {
//               type: Type.OBJECT,
//               properties: {
//                 text: { type: Type.STRING },
//                 options: {
//                   type: Type.ARRAY,
//                   items: { type: Type.STRING }
//                 },
//                 correctAnswer: { type: Type.INTEGER }
//               },
//               required: ["text", "options", "correctAnswer"]
//             }
//           }
//         },
//         required: ["title", "questions"]
//       }
//     }
//   });

//   try {
//     // Correctly accessing the text property from GenerateContentResponse.
//     return JSON.parse(response.text);
//   } catch (e) {
//     console.error("Failed to parse quiz response", e);
//     return null;
//   }
// };

// export const summarizeLesson = async (content: string) => {
//   const response = await ai.models.generateContent({
//     model: "gemini-3-flash-preview",
//     contents: `Summarize the following educational content in 3 bullet points: ${content}`,
//   });
//   // Using the .text property of GenerateContentResponse.
//   return response.text;
// };
