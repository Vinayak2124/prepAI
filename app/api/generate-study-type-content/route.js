import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { NextResponse } from "next/server";
import db from "@/configs/db";
import { inngest } from "@/inngest/client";

export async function POST(req) {
  try {
    const { chapters, courseId, type } = await req.json();
    let PROMPT;
    if (type === "flashCard") {
      PROMPT = `
You are an expert educational content generator.  
Generate high-quality flashcards for the given topic in valid JSON format only.

Rules:
- Create a maximum of 15 flashcards.
- Each flashcard must have:
  front: a clear question, keyword, or concept name.
  back: a detailed, student-friendly explanation for the front. Include examples for deep understanding.
- Use simple, clear language suitable for learners.
- Cover a range of key points and subtopics relevant to the given chapters.
- Format the output as a valid JSON object named "flashcards", which contains an array of objects with "front" and "back" keys.
- Do not add any extra text, instructions, or commentary outside the JSON. Return only raw JSON.

Now, generate the flashcards for the following chapters: ${chapters}
`;
    } else if (type === "quiz") {
      PROMPT = `
You are an expert educational content generator.  
Generate a high-quality quiz with options and the correct answer for the given topic in valid JSON format only.

Each question must have:
- A clear question text.
- Four answer options labeled A, B, C, and D.
- The correct answer specified as the option letter.

Provide the output in valid JSON format with the following structure:

{
  "topic": "<TOPIC_NAME>",
  "questions": [
    {
      "question": "<Question text>",
      "options": {
        "A": "<Option A text>",
        "B": "<Option B text>",
        "C": "<Option C text>",
        "D": "<Option D text>"
      },
      "correct_answer": "A"  // Use the option letter only
    },
    ...
  ]
}

Generate at least 15 questions.

Example:
{
  "topic": "Photosynthesis",
  "questions": [
    {
      "question": "Which gas is absorbed during photosynthesis?",
      "options": {
        "A": "Carbon Dioxide",
        "B": "Oxygen",
        "C": "Nitrogen",
        "D": "Hydrogen"
      },
      "correct_answer": "A"
    },
    ...
  ]
}
  
Now generate the quiz on: ${chapters}
`;
    } else {
      PROMPT = `
  
  "text": "Generate multiple conceptual question-and-answer pairs based on the following chapters----
   For each chapter, generate at least 7-10  question-answer pairs. The output should be in valid JSON format only, structured as an array of objects. Each object must contain two fields: \"question\" and \"answer\". The \"question\" field should contain the question in an <h2> HTML tag. The \"answer\" field should contain a detailed explanation in HTML using tags like <p>, <ul>, <li>, <b>, <i>, <code>, and <pre>. Do not include any markdown syntax, triple backticks, or non-JSON text. Return only a clean JSON array without any comments or extra explanation."

   Format of the question and Answers ->
   - Question must be in h2 and in bold with margin from top and bottom.
   - Answer include different types of thr rich content and contain the bold subheadings and margin padding tables container wherver required with the suitable examples..!

        
  Now  Generate a question and its detailed answer on the topic: ${chapters}
        
        
        `;
    }

    const result = await db
      .insert(STUDY_TYPE_CONTENT_TABLE)
      .values({
        courseId: courseId,
        type: type,
      })
      .returning({
        id: STUDY_TYPE_CONTENT_TABLE.id,
      });

    await inngest.send({
      name: "studyType.content",
      data: {
        studyType: type,
        prompt: PROMPT,
        courseId: courseId,
      },
    });

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error in study-type-content API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
