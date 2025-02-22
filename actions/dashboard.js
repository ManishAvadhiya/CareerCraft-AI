"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const  model = genAI.getGenerativeModel({
    model:"gemini-1.5-flash"
})
export const generateAIInsights = async (industry) => {
    try {
      const prompt = `
        Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
        {
          "salaryRanges": [
            { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
          ],
          "growthRate": number,
          "demandLevel": "High" | "Medium" | "Low",
          "topSkills": ["skill1", "skill2"],
          "marketOutlook": "Positive" | "Neutral" | "Negative",
          "keyTrends": ["trend1", "trend2"],
          "recommendedSkills": ["skill1", "skill2"]
        }
  
        IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
        Include at least 5 common roles for salary ranges.
        Growth rate should be a percentage.
        Include at least 5 skills and trends.
      `;
  
      console.log("Sending request to Gemini API...");
      const result = await model.generateContent(prompt);
      
      if (!result || !result.response) {
        throw new Error("Invalid response from AI API");
      }
  
      console.log("Raw AI API response:", result.response);
      
      const text = result.response.text?.();
      console.log("Extracted AI Response:", text);
      
      // Ensure we extract JSON properly
      const jsonMatch = text?.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON found in response");
  
      const parsed = JSON.parse(jsonMatch[0]);
      console.log("Parsed AI Insights:", parsed);
  
      // Validate the required keys
      const requiredKeys = [
        'salaryRanges', 'growthRate', 'demandLevel',
        'topSkills', 'marketOutlook', 'keyTrends', 'recommendedSkills'
      ];
  
      requiredKeys.forEach(key => {
        if (!parsed[key]) throw new Error(`Missing key in AI response: ${key}`);
      });
  
      return parsed;
  
    } catch (error) {
      console.error("AI Insights Error:", error);
      
      // Ensure fallback data is a valid object
      return {
        salaryRanges: [],
        growthRate: 0,
        demandLevel: "MEDIUM",
        topSkills: [],
        marketOutlook: "NEUTRAL",
        keyTrends: [],
        recommendedSkills: []
      };
    }
  };
  
export async function getIndustryInsights(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) throw new Error("User not found");

  if(!user.industryInsight){
    const insights = await generateAIInsights(user.industry);

const industryInsight = await db.industryInsight.upsert({
  where: { industry: user.industry }, // 🔍 Check if it already exists
  update: {  // 🔄 Update if found
    salaryRanges: insights.salaryRanges || [],
    growthRate: insights.growthRate || 0,
    demandLevel: insights.demandLevel?.toUpperCase() || "MEDIUM",
    topSkills: insights.topSkills || [],
    marketOutlook: insights.marketOutlook?.toUpperCase() || "NEUTRAL",
    keyTrends: insights.keyTrends || [],
    recommendedSkills: insights.recommendedSkills || [],
    nextUpdated: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  },
  create: {  // 🆕 Create if not found
    industry: user.industry,
    salaryRanges: insights.salaryRanges || [],
    growthRate: insights.growthRate || 0,
    demandLevel: insights.demandLevel?.toUpperCase() || "MEDIUM",
    topSkills: insights.topSkills || [],
    marketOutlook: insights.marketOutlook?.toUpperCase() || "NEUTRAL",
    keyTrends: insights.keyTrends || [],
    recommendedSkills: insights.recommendedSkills || [],
    nextUpdated: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
});

    return industryInsight;
  }
  return user.industryInsight;
}

