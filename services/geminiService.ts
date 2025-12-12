import { GoogleGenAI } from "@google/genai";
import { Unit, QualificationType, Subject, CalculationResult } from "../types";

export const getAIAdvice = async (
  subject: Subject,
  qualification: QualificationType,
  units: Unit[],
  results: CalculationResult
): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `
      As an academic advisor, please analyze the following student results and provide constructive feedback:

      Subject: ${subject}
      Qualification: ${qualification}

      Unit Breakdown:
      ${units.map((u) => `- ${u.name}: ${u.grade} (${u.points} points)`).join("\n")}

      Overall Results:
      Total Points: ${results.totalPoints}
      Grade: ${results.grade}

      Please include:
      1. Performance Summary
      2. Strengths & Weaknesses
      3. Recommendations for improvement or next steps (university/career)
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text ?? "No advice generated.";
  } catch (error) {
    console.error("Error generating AI advice:", error);
    return "Unable to generate advice at this time. Please check your connection and try again.";
  }
};