"use server";

import { currentUser } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";

export const generateCreativePrompt = async (userPrompt: string) => {
  // Initialize Gemini
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const finalPrompt = `
    Create a coherent and relevant outline for the following prompt: ${userPrompt}.
    The outline should consist of exactly 6 points, with each point written as a single sentence.
    Ensure the outline is well-structured and directly related to the topic.
    
    Return ONLY the following JSON format without any additional text or markdown:
    {
      "outline": [
        "Point 1",
        "Point 2", 
        "Point 3",
        "Point 4",
        "Point 5",
        "Point 6"
      ]
    }`;

  try {
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: finalPrompt }],
        },
      ],
      generationConfig: {
        temperature: 0,
        maxOutputTokens: 1000,
      },
    });

    const responseText = result.response.text();

    // Gemini sometimes adds markdown, so we clean it
    const jsonString = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      const jsonResponse = JSON.parse(jsonString);
      return { status: 200, data: jsonResponse };
    } catch (error) {
      console.error("Invalid JSON from Gemini:", jsonString, error);
      return { status: 500, error: "Failed to parse Gemini response" };
    }
  } catch (error) {
    console.error("Gemini API error:", error);
    return {
      status: 500,
      error: error instanceof Error ? error.message : "Gemini API error",
    };
  }
};

export const generateLayouts = async (projectId: string, theme: string) => {
  try {
    if (!projectId) {
      return {
        status: 400,
        error: "Project ID is required",
      };
    }
    const user = await currentUser();
    if (!user) {
      return {
        status: 403,
        error: "Unauthorized",
      };
    }

    const userExist = await prisma?.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    if (!userExist || !userExist.subscription) {
      return {
        status: 403,
        error: !userExist?.subscription
          ? "User does not have a subscription"
          : "User does not exist",
      };
    }

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
        isDeleted: false,
      },
    });

    if (!project) {
      return {
        status: 404,
        error: "Project not found",
      };
    }

    if (!project.outline || project.outline.length === 0) {
      return {
        status: 400,
        error: "Project doesn't have any outline",
      };
    }

    const layouts = await generateLayoutsJson(project.outline);

    if (layouts.status !== 200) {
      return layouts;
    }

    await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        slides: layouts.data,
        themeName: theme,
      },
    });

    return { status: 200, data: layouts.data };
  } catch (error) {
    console.error("Error generating layouts:", error);
    return {
      status: 500,
      error: error instanceof Error ? error.message : "Internal Server Error",
    };
  }
};
