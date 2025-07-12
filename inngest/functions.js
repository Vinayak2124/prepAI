import { inngest } from "./client";
import db from "@/configs/db";
import { eq } from "drizzle-orm";
import {
  CHAPTER_NOTES_TABLE,
  STUDY_MATERIAL_TABLE,
  STUDY_TYPE_CONTENT_TABLE,
  USER_TABLE,
} from "@/configs/schema";
import {
  generateNotesAIModel,
  generateQuizAIModel,
  generateStudyTypeContentAiModel,
  generateQAAIModel,
} from "@/configs/AiModel";

export const CreateNewUser = inngest.createFunction(
  { id: "create-user" },
  { event: "user.create" },
  async ({ event, step }) => {
    const { user } = event.data;

    if (!user) {
      throw new Error("No user data found in event.");
    }

    const name = user.fullName ?? "Anonymous";
    const email =
      user.primaryEmailAddress?.emailAddress ?? "no-email@example.com";

    const result = await step.run(
      "Check user and create new if not in DB",
      async () => {
        const existing = await db
          .select()
          .from(USER_TABLE)
          .where(eq(USER_TABLE.email, email));

        if (existing.length === 0) {
          const inserted = await db
            .insert(USER_TABLE)
            .values({
              name,
              email,
              isMember: false,
            })
            .returning({ id: USER_TABLE.id });

          return inserted;
        }

        return existing;
      }
    );

    return { status: "success", data: result };
  }
);

// export const GenerateNotes = inngest.createFunction(
//   { id: "generate-course" },
//   { event: "notes.generate" },
//   async ({ event, step }) => {
//     const { course } = event.data;

//     const notesResult = await step.run("Generate Chapter Notes", async () => {
//       const chapters = course?.courseLayout?.Chapters;
//       let index = 0;
//       chapters.forEach(async (chapter) => {
//         const PROMPT = `
//         You are an expert in educational content creation.

// Your task is to generate detailed and well-structured exam preparation content for each given chapter and topic.

// For each Chapter > Topic > Subtopic, follow these instructions:

//  Definition:
//  - Clearly define the concept/topic with proper explanation in simple yet technical language.

//  Prerequisites:
//  -Mention what prior knowledge is needed before learning the topic.

//  Concept Explanation:
// -Explain the logic, use-cases, and core understanding of the topic.
// - Coding Topics Specifics (if applicable):
// - Implement each coding-related topic or algorithm in Java, C++, and Python side by side.
// -For each implementation, explain step-by-step how the code works.

//  Solved Examples (Minimum 10):
//  -Solve at least 10 high-quality questions based on the topic.
//  -Use step-by-step solutions, including formulas or algorithms.
// -For fact-based or real-world questions, use reliable data via web search (or simulate that in output).

//  Extra Practice Questions:
// - Provide 5–7 extra practice questions for students to solve.
// - Mention their expected difficulty level (Easy, Moderate, Hard).
//  -Tips and Tricks:
// - Mention shortcut methods, best practices, or common mistakes students make.

// Output Format (strictly return as HTML):

// Only use semantic HTML elements like <h1>, <h2>, <h3>, <p>, <ul>, <ol>, <pre>, etc.

// Do not include <html>, <head>, <body> or any inline styles.

// Make sure it can be directly injected into a web page container.

// Format all code examples inside <pre><code> blocks with language hints.

// Do not skip any topic and make sure all content is technically correct, in-depth, and engaging for self-study.

// -------The Chapter You are going to generate are given below :--
// ${chapter} `;

//         const result = await generateNotesAIModel.models.generateContent({
//           model: "gemini-2.0-flash-lite", // or "gemini-2.0-flash"
//           contents: [{ role: "user", parts: [{ text: PROMPT }] }],
//         });

//         const aiResponse = result.candidates[0].content.parts[0].text;
//         await db.insert(CHAPTER_NOTES_TABLE).values({
//           chapterId: index,
//           courseId: course?.courseId,
//           notes:aiResponse
//         })
//         index = index+1
//       })
//       return 'Completed'

//       const updateCourseStatusResult = await step.run('Update Course Status to be ready', async () => {
//         const result = await db.update(STUDY_MATERIAL_TABLE).set({status:'Ready'}).where(eq(STUDY_MATERIAL_TABLE.courseId,course?.courseId))
//       })
//       return "Success";
//     });
//   }
// );

export const GenerateNotes = inngest.createFunction(
  { id: "generate-course" },
  { event: "notes.generate" },
  async ({ event, step }) => {
    const { course } = event.data;

    // 1️⃣ Generate notes for each chapter sequentially
    await step.run("Generate Chapter Notes", async () => {
      const chapters = course?.courseLayout?.Chapters ?? [];

      for (let index = 0; index < chapters.length; index++) {
        const chapter = chapters[index];

        const PROMPT = `
You are an expert educational content creator.
Generate detailed, clean, and interactive study notes for the given chapter in semantic HTML format.
Requirements:

Do NOT include html, head, or body tags. The content must be ready to embed inside an existing web page.

Structure:
Use a single h1 for the chapter and in BOLD and give margin from top and bottom.
Use h2 for main sections.
Use h3 for sub-sections if needed.
Add clear spacing between sections using proper semantic tags like section, div, or hr.

Headings:
All headings must be visually clear and bold by default (use proper heading tags).

Content:

Use p tags for clear, short paragraphs.
Use ul or ol for lists.
Highlight important keywords or phrases using strong or em.
Add blockquote for key takeaways or notable points.
Include tables whenever you explain comparisons, steps, or data.
If giving code examples, wrap them in pre and code tags inside a separate div with extra margin or padding for emphasis.
Add indexing where appropriate: for example, numbered lists for steps.

Presentation:
Keep the HTML clean and readable.
Ensure the content is easy to render responsively.
Avoid inline styles; use semantic HTML only.
Write clear, concise explanations for each concept and example.
Write in a simple, clear teaching style suitable for students.



Chapter to generate:
${JSON.stringify(chapter, null, 2)}
`;

        const result = await generateNotesAIModel.models.generateContent({
          model: "gemini-2.0-flash-lite",
          contents: [{ role: "user", parts: [{ text: PROMPT }] }],
        });

        const aiResponse =
          result?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

        await db.insert(CHAPTER_NOTES_TABLE).values({
          // ⚠️ Use a proper unique chapterId if possible
          chapterId: `${index}`,
          courseId: course?.courseId,
          notes: aiResponse,
        });
      }
    });

    // 2️⃣ Update course status to 'Ready' only after chapters are done
    await step.run("Update Course Status to 'Ready'", async () => {
      const update = await db
        .update(STUDY_MATERIAL_TABLE)
        .set({ status: "Ready" })
        .where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId));

      console.log(`Status update result:`, update);
    });

    return "✅ Notes generation complete, course marked as Ready!";
  }
);

// export const GenerateStudyTypeContent = inngest.createFunction(
//   { id: "Generate Study Content" },
//   { event: "studytype.content" },

//   async ({ event, step }) => {
//     const { studyType, prompt, courseId } = event.data;

//     const FlashcardAiResult = await step.run(
//       "Generating Flashcard using AI",
//       async () => {
//         const result =
//           await generateStudyTypeContentAiModel.models.generateContent({
//             model: "gemini-2.0-flash-lite",
//             contents: [{ role: "user", parts: [{ text: prompt }] }],
//           });

//         const AIRESULT = JSON.parse(
//           result?.candidates?.[0]?.content?.parts?.[0]?.text
//         );

//         return AIRESULT;
//       }
//     );

//     const DBResult = await step.run("Save Result to DB", async () => {
//       const result = await db
//         .update(STUDY_TYPE_CONTENT_TABLE)
//         .set({
//           content: FlashcardAiResult,
//         })
//         .where(eq(STUDY_MATERIAL_TABLE.courseId, courseId))
//         .where(eq(STUDY_TYPE_CONTENT_TABLE.type, studyType));
//       return "Data Inserted";
//     });
//   }
// );

// export const GenerateStudyTypeContent = inngest.createFunction(
//   { id: "Generate Study Content" },
//   { event: "studytype.content" },

//   async ({ event, step }) => {
//     const { studyType, prompt, courseId } = event.data;

//     const AIResult = await step.run(
//       "Generating Study Content using AI",
//       async () => {
//         let result;

//         if (studyType === "flashCard") {
//           result = await generateStudyTypeContentAiModel.models.generateContent(
//             {
//               model: "gemini-2.0-flash-lite",
//               contents: [{ role: "user", parts: [{ text: prompt }] }],
//             }
//           );
//         } else if (studyType === "quiz") {
//           result = await generateQuizAIModel.models.generateContent({
//             model: "gemini-2.0-flash-lite",
//             contents: [{ role: "user", parts: [{ text: prompt }] }],
//           });
//         } else if (studyType === "qa") {
//           result = await generateQAAIModel.models.generateContent({
//             model: "gemini-2.0-flash-lite",
//             contents: [{ role: "user", parts: [{ text: prompt }] }],
//           });
//         }

//         console.log("AI raw result:", result);

//         const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

//         console.log("AI raw JSON string:", text);
//         const cleanText = text
//           .replace(/```json/gi, "")
//           .replace(/```/g, "")
//           .trim();

//         console.log("AI clean JSON string:", cleanText);

//         const AIRESULT = JSON.parse(cleanText);
//         console.log("Parsed AIRESULT:", AIRESULT);
//         return AIRESULT;
//       }
//     );

//     const DBResult = await step.run("Save Result to DB", async () => {
//       const result = await db
//         .update(STUDY_TYPE_CONTENT_TABLE)
//         .set({
//           content: AIResult,
//           status: "Ready",
//         })
//         .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId))
//         .where(eq(STUDY_TYPE_CONTENT_TABLE.type, studyType));

//       return result;
//     });

//     return { status: "ok", saved: DBResult };
//   }
// );

// export const GenerateStudyTypeContent = inngest.createFunction(
//   { id: "Generate Study Content" },
//   { event: "studytype.content" },

//   async ({ event, step }) => {
//     const { studyType, prompt, courseId } = event.data;

//     const AIResult = await step.run(
//       "Generating Study Content using AI",
//       async () => {
//         let result;

//         if (studyType === "flashCard") {
//           result = await generateStudyTypeContentAiModel.models.generateContent(
//             {
//               model: "gemini-2.0-flash-lite",
//               contents: [{ role: "user", parts: [{ text: prompt }] }],
//             }
//           );
//         } else if (studyType === "quiz") {
//           result = await generateQuizAIModel.models.generateContent({
//             model: "gemini-2.0-flash-lite",
//             contents: [{ role: "user", parts: [{ text: prompt }] }],
//           });
//         } else if (studyType === "qa") {
//           result = await generateQAAIModel.models.generateContent({
//             model: "gemini-2.0-flash-lite",
//             contents: [{ role: "user", parts: [{ text: prompt }] }],
//           });
//         }

//         console.log("AI raw result:", JSON.stringify(result, null, 2));

//         const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

//         if (!text) {
//           throw new Error("Gemini did not return any text.");
//         }

//         const cleanText = text
//           .replace(/```json/gi, "")
//           .replace(/```/g, "")
//           .trim();

//         if (!cleanText || cleanText === "null") {
//           throw new Error("Gemini response was null or empty.");
//         }

//         let AIRESULT;
//         try {
//           AIRESULT = JSON.parse(cleanText);
//         } catch (err) {
//           console.error("JSON parsing failed:", cleanText);
//           throw err;
//         }

//         console.log("Parsed AIRESULT:", AIRESULT);
//         return AIRESULT;
//       }
//     );

//     const DBResult = await step.run("Save Result to DB", async () => {
//       const result = await db
//         .update(STUDY_TYPE_CONTENT_TABLE)
//         .set({
//           content: AIResult,
//           status: "Ready",
//         })
//         .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId))
//         .where(eq(STUDY_TYPE_CONTENT_TABLE.type, studyType));

//       return result;
//     });

//     return { status: "ok", saved: DBResult };
//   }
// );

export const GenerateStudyTypeContent = inngest.createFunction(
  { id: "Generate Study Content" },
  { event: "studyType.content" },

  async ({ event, step }) => {
    const { studyType, prompt, courseId } = event.data;

    const AIResult = await step.run(
      "Generating Study Content using AI",
      async () => {
        let result;

        if (studyType === "flashCard") {
          result = await generateStudyTypeContentAiModel.models.generateContent(
            {
              model: "gemini-2.0-flash-lite",
              contents: [{ role: "user", parts: [{ text: prompt }] }],
            }
          );
        } else if (studyType === "quiz") {
          result = await generateQuizAIModel.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: [{ role: "user", parts: [{ text: prompt }] }],
          });
        } else if (studyType === "qa") {
          result = await generateQAAIModel.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: [{ role: "user", parts: [{ text: prompt }] }],
          });
        }

        console.log("AI raw result:", JSON.stringify(result, null, 2));

        const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
          throw new Error("Gemini did not return any text.");
        }

        const cleanText = text
          ?.replace(/```json/gi, "")
          .replace(/```/g, "")
          .trim();

        if (!cleanText || cleanText === "null") {
          throw new Error("Gemini response was null or empty.");
        }

        let AIRESULT;
        try {
          AIRESULT = JSON.parse(cleanText);
        } catch (err) {
          console.error("JSON parsing failed:", cleanText);
          throw err;
        }

        console.log("Parsed AIRESULT:", AIRESULT);
        return AIRESULT;
      }
    );

    const DBResult = await step.run("Save Result to DB", async () => {
      const result = await db
        .update(STUDY_TYPE_CONTENT_TABLE)
        .set({
          content: AIResult,
          status: "Ready",
        })
        .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId))
        .where(eq(STUDY_TYPE_CONTENT_TABLE.type, studyType));

      return result;
    });

    return { status: "ok", saved: DBResult };
  }
);

// export const GenerateStudyTypeContent = inngest.createFunction(
//   { id: "Generate Study Content" },
//   { event: "studyType.content" },

//   async ({ event, step }) => {
//     const { studyType, prompt, courseId } = event.data;

//     // 1️⃣ Generate AI Flashcards using correct format
//     const AiResult = await step.run(
//       "Generate Flashcard using Gemini AI",
//       async () => {
//         const result =
//           studyType == "flashCard"
//             ? await generateNotesAIModel.models.generateContent({
//                 model: "gemini-2.0-flash-lite",
//                 contents: [{ role: "user", parts: [{ text: prompt }] }],
//               })
//             : await generateQuizAIModel.models.generateContent({
//                 model: "gemini-2.0-flash-lite",
//                 contents: [{ role: "user", parts: [{ text: prompt }] }],
//               });

//         console.log("AI raw result:", result);

//         const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

//         console.log("AI raw JSON string:", text);
//         const cleanText = text
//           ?.replace(/```json/gi, "")
//           .replace(/```/g, "")
//           .trim();

//         console.log("AI clean JSON string:", cleanText);

//         const AIRESULT = JSON.parse(cleanText);

//         console.log("Parsed AIRESULT:", AIRESULT);
//         return AIRESULT;
//       }
//     );

//     const DBResult = await step.run("Save Result to DB", async () => {
//       const result = await db
//         .update(STUDY_TYPE_CONTENT_TABLE)
//         .set({
//           content: AiResult,
//           status: "Ready",
//         })
//         .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId))
//         .where(eq(STUDY_TYPE_CONTENT_TABLE.type, studyType));

//       return result;
//     });

//     return { status: "ok", saved: DBResult };
//   }
// );
