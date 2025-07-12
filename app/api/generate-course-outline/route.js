// import { courseOutlineGenerateAIModel } from "@/configs/AiModel";
// import { NextResponse } from "next/server";
// import db from "@/configs/db";
// import { STUDY_MATERIAL_TABLE } from "@/configs/schema";

// export async function POST(req) {
//   try {
//     const { courseId, courseType, topic, createdBy, difficultyLevel } =
//       await req.json();

//     const PROMPT = `Generate comprehensive study material for the topic "${topic}" for a "${courseType}" course at "${difficultyLevel}" level, and provide the result strictly in valid JSON format containing: a CourseSummary giving an overview of the entire course; a Chapters array, where each chapter has a ChapterTitle, a ChapterSummary explaining the chapter, and a Topics array listing key topics in that chapter. Use clear, concise language suitable for the difficulty level, keep the JSON clean and consistent, and do not include any extra text or explanations outside the JSON output.`;

//     // ✅ Correct: get the Generative Model from your exported instance
//     const model = courseOutlineGenerateAIModel.getGenerativeModel({
//       model: "gemini-2.0-flash-lite",
//     });

//     // ✅ Call generateContent properly (not on the raw instance)
//     const aiResponse = await model.generateContent([PROMPT]);

//     // ✅ Extract generated text properly
//     const generatedText =
//       aiResponse.response.candidates[0].content.parts[0].text;

//     console.log("Generated Text:", generatedText);

//     // ✅ Safely parse JSON only from the JSON block
//     const cleanJson = generatedText.trim().match(/\{[\s\S]*\}/)?.[0];
//     const aiResult = JSON.parse(cleanJson);

//     // ✅ Insert into DB
//     const dbResult = await db
//       .insert(STUDY_MATERIAL_TABLE)
//       .values({
//         courseId,
//         courseType,
//         topic,
//         createdBy,
//         difficultyLevel,
//         courseLayout: aiResult, // or JSON.stringify(aiResult) if your column is TEXT
//       })
//       .returning();

//     console.log("DB Insert Result:", dbResult);

//     return NextResponse.json({ result: dbResult[0] });
//   } catch (error) {
//     console.error("API Route Error:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error", details: error.message },
//       { status: 500 }
//     );
//   }
// }
import { genAI } from "@/configs/AiModel";
import { NextResponse } from "next/server";
import db from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";

export async function POST(req) {
  try {
    const { courseId, courseType, topic, createdBy, difficultyLevel } =
      await req.json();

    const PROMPT = `
    You are an expert course content creator. 
    Generate a comprehensive study material strictly in VALID JSON only in the following structure:
    
    {
      "CourseSummary": {
        "CourseName": "...",
        "CourseLevel": "...",
        "CourseCategory": "...",
        "CourseDescription": "...",
        "Prerequisites": [],
        "LearningObjectives": [],
        "AssessmentMethods": [],
        "RecommendedResources": []
      },
      "Chapters": [
        {
          "ChapterTitle": "...",
          "ChapterDescription": "...",
          "Topics": [
            {
              "TopicTitle": "...",
              "TopicDescription": "...",
              "Subtopics": [],
              "PracticeProblems": [],
              "TipsAndTricks": []
            }
          ],
          "QuizQuestions": []
        }
      ]
    }
      You must return your final answer strictly wrapped in:
\`\`\`json
{
  ... valid JSON ...
}
\`\`\`

Never add explanations, just the JSON block.

    
    Requirements:
    - Follow the exact JSON field names as given above.
    - Do not include any explanation, extra text, or notes — only output a single valid JSON object.
    - Make sure the JSON is syntactically correct.
    - Fill in realistic, high-quality content for each field, subtopic, problem, and quiz question.
    - The course topic is "${topic}", for a "${courseType}" course at "${difficultyLevel}" level.
    `;

    // ✅ Call the Node SDK properly (no .getGenerativeModel)
    const aiResponse = await genAI.models.generateContent({
      model: "gemini-2.0-flash-lite", // or "gemini-2.0-flash"
      contents: [{ role: "user", parts: [{ text: PROMPT }] }],
    });
    console.log(aiResponse);
    const generatedText = aiResponse.candidates[0].content.parts[0].text;

    const cleanJson = generatedText.trim().match(/\{[\s\S]*\}/)?.[0];
    const aiResult = JSON.parse(cleanJson);
    const dbResult = await db
      .insert(STUDY_MATERIAL_TABLE)
      .values({
        courseId,
        courseType,
        topic,
        createdBy,
        difficultyLevel,
        courseLayout: aiResult,
      })
      .returning({ resp: STUDY_MATERIAL_TABLE });

    const result = await inngest.send({
      name: "notes.generate",
      data: {
        course: dbResult[0].resp,
      },
    });
    console.log(result);

    return NextResponse.json({ result: dbResult[0] });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
