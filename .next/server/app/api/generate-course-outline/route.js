/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/generate-course-outline/route";
exports.ids = ["app/api/generate-course-outline/route"];
exports.modules = {

/***/ "(rsc)/./app/api/generate-course-outline/route.js":
/*!**************************************************!*\
  !*** ./app/api/generate-course-outline/route.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   dynamic: () => (/* binding */ dynamic)\n/* harmony export */ });\n/* harmony import */ var _configs_AiModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/configs/AiModel */ \"(rsc)/./configs/AiModel.js\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _configs_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/configs/db */ \"(rsc)/./configs/db.js\");\n/* harmony import */ var _configs_schema__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/configs/schema */ \"(rsc)/./configs/schema.js\");\n/* harmony import */ var _inngest_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/inngest/client */ \"(rsc)/./inngest/client.js\");\n// import { courseOutlineGenerateAIModel } from \"@/configs/AiModel\";\n// import { NextResponse } from \"next/server\";\n// import db from \"@/configs/db\";\n// import { STUDY_MATERIAL_TABLE } from \"@/configs/schema\";\n// export async function POST(req) {\n//   try {\n//     const { courseId, courseType, topic, createdBy, difficultyLevel } =\n//       await req.json();\n//     const PROMPT = `Generate comprehensive study material for the topic \"${topic}\" for a \"${courseType}\" course at \"${difficultyLevel}\" level, and provide the result strictly in valid JSON format containing: a CourseSummary giving an overview of the entire course; a Chapters array, where each chapter has a ChapterTitle, a ChapterSummary explaining the chapter, and a Topics array listing key topics in that chapter. Use clear, concise language suitable for the difficulty level, keep the JSON clean and consistent, and do not include any extra text or explanations outside the JSON output.`;\n//     // ✅ Correct: get the Generative Model from your exported instance\n//     const model = courseOutlineGenerateAIModel.getGenerativeModel({\n//       model: \"gemini-2.0-flash-lite\",\n//     });\n//     // ✅ Call generateContent properly (not on the raw instance)\n//     const aiResponse = await model.generateContent([PROMPT]);\n//     // ✅ Extract generated text properly\n//     const generatedText =\n//       aiResponse.response.candidates[0].content.parts[0].text;\n//     console.log(\"Generated Text:\", generatedText);\n//     // ✅ Safely parse JSON only from the JSON block\n//     const cleanJson = generatedText.trim().match(/\\{[\\s\\S]*\\}/)?.[0];\n//     const aiResult = JSON.parse(cleanJson);\n//     // ✅ Insert into DB\n//     const dbResult = await db\n//       .insert(STUDY_MATERIAL_TABLE)\n//       .values({\n//         courseId,\n//         courseType,\n//         topic,\n//         createdBy,\n//         difficultyLevel,\n//         courseLayout: aiResult, // or JSON.stringify(aiResult) if your column is TEXT\n//       })\n//       .returning();\n//     console.log(\"DB Insert Result:\", dbResult);\n//     return NextResponse.json({ result: dbResult[0] });\n//   } catch (error) {\n//     console.error(\"API Route Error:\", error);\n//     return NextResponse.json(\n//       { error: \"Internal Server Error\", details: error.message },\n//       { status: 500 }\n//     );\n//   }\n// }\n\n\n\n\n\nconst dynamic = \"force-dynamic\";\nasync function POST(req) {\n    try {\n        const { courseId, courseType, topic, createdBy, difficultyLevel } = await req.json();\n        const PROMPT = `\n    You are an expert course content creator. \n    Generate a comprehensive study material strictly in VALID JSON only in the following structure:\n    \n    {\n      \"CourseSummary\": {\n        \"CourseName\": \"...\",\n        \"CourseLevel\": \"...\",\n        \"CourseCategory\": \"...\",\n        \"CourseDescription\": \"...\",\n        \"Prerequisites\": [],\n        \"LearningObjectives\": [],\n        \"AssessmentMethods\": [],\n        \"RecommendedResources\": []\n      },\n      \"Chapters\": [\n        {\n          \"ChapterTitle\": \"...\",\n          \"ChapterDescription\": \"...\",\n          \"Topics\": [\n            {\n              \"TopicTitle\": \"...\",\n              \"TopicDescription\": \"...\",\n              \"Subtopics\": [],\n              \"PracticeProblems\": [],\n              \"TipsAndTricks\": []\n            }\n          ],\n          \"QuizQuestions\": []\n        }\n      ]\n    }\n      You must return your final answer strictly wrapped in:\n\\`\\`\\`json\n{\n  ... valid JSON ...\n}\n\\`\\`\\`\n\nNever add explanations, just the JSON block.\n\n    \n    Requirements:\n    - Follow the exact JSON field names as given above.\n    - Do not include any explanation, extra text, or notes — only output a single valid JSON object.\n    - Make sure the JSON is syntactically correct.\n    - Fill in realistic, high-quality content for each field, subtopic, problem, and quiz question.\n    - The course topic is \"${topic}\", for a \"${courseType}\" course at \"${difficultyLevel}\" level.\n    `;\n        // ✅ Call the Node SDK properly (no .getGenerativeModel)\n        const aiResponse = await _configs_AiModel__WEBPACK_IMPORTED_MODULE_0__.genAI.models.generateContent({\n            model: \"gemini-2.0-flash-lite\",\n            contents: [\n                {\n                    role: \"user\",\n                    parts: [\n                        {\n                            text: PROMPT\n                        }\n                    ]\n                }\n            ]\n        });\n        console.log(aiResponse);\n        const generatedText = aiResponse.candidates[0].content.parts[0].text;\n        const cleanJson = generatedText.trim().match(/\\{[\\s\\S]*\\}/)?.[0];\n        const aiResult = JSON.parse(cleanJson);\n        const dbResult = await _configs_db__WEBPACK_IMPORTED_MODULE_2__[\"default\"].insert(_configs_schema__WEBPACK_IMPORTED_MODULE_3__.STUDY_MATERIAL_TABLE).values({\n            courseId,\n            courseType,\n            topic,\n            createdBy,\n            difficultyLevel,\n            courseLayout: aiResult\n        }).returning({\n            resp: _configs_schema__WEBPACK_IMPORTED_MODULE_3__.STUDY_MATERIAL_TABLE\n        });\n        const result = await _inngest_client__WEBPACK_IMPORTED_MODULE_4__.inngest.send({\n            name: \"notes.generate\",\n            data: {\n                course: dbResult[0].resp\n            }\n        });\n        console.log(result);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            result: dbResult[0]\n        });\n    } catch (error) {\n        console.error(\"API Route Error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: \"Internal Server Error\",\n            details: error.message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2dlbmVyYXRlLWNvdXJzZS1vdXRsaW5lL3JvdXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxvRUFBb0U7QUFDcEUsOENBQThDO0FBQzlDLGlDQUFpQztBQUNqQywyREFBMkQ7QUFFM0Qsb0NBQW9DO0FBQ3BDLFVBQVU7QUFDViwwRUFBMEU7QUFDMUUsMEJBQTBCO0FBRTFCLG9sQkFBb2xCO0FBRXBsQix5RUFBeUU7QUFDekUsc0VBQXNFO0FBQ3RFLHdDQUF3QztBQUN4QyxVQUFVO0FBRVYsbUVBQW1FO0FBQ25FLGdFQUFnRTtBQUVoRSwyQ0FBMkM7QUFDM0MsNEJBQTRCO0FBQzVCLGlFQUFpRTtBQUVqRSxxREFBcUQ7QUFFckQsc0RBQXNEO0FBQ3RELHdFQUF3RTtBQUN4RSw4Q0FBOEM7QUFFOUMsMEJBQTBCO0FBQzFCLGdDQUFnQztBQUNoQyxzQ0FBc0M7QUFDdEMsa0JBQWtCO0FBQ2xCLG9CQUFvQjtBQUNwQixzQkFBc0I7QUFDdEIsaUJBQWlCO0FBQ2pCLHFCQUFxQjtBQUNyQiwyQkFBMkI7QUFDM0Isd0ZBQXdGO0FBQ3hGLFdBQVc7QUFDWCxzQkFBc0I7QUFFdEIsa0RBQWtEO0FBRWxELHlEQUF5RDtBQUN6RCxzQkFBc0I7QUFDdEIsZ0RBQWdEO0FBQ2hELGdDQUFnQztBQUNoQyxvRUFBb0U7QUFDcEUsd0JBQXdCO0FBQ3hCLFNBQVM7QUFDVCxNQUFNO0FBQ04sSUFBSTtBQUNzQztBQUNDO0FBQ2I7QUFDMEI7QUFDYjtBQUNwQyxNQUFNSyxVQUFVLGdCQUFnQjtBQUVoQyxlQUFlQyxLQUFLQyxHQUFHO0lBQzVCLElBQUk7UUFDRixNQUFNLEVBQUVDLFFBQVEsRUFBRUMsVUFBVSxFQUFFQyxLQUFLLEVBQUVDLFNBQVMsRUFBRUMsZUFBZSxFQUFFLEdBQy9ELE1BQU1MLElBQUlNLElBQUk7UUFFaEIsTUFBTUMsU0FBUyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQkErQ08sRUFBRUosTUFBTSxVQUFVLEVBQUVELFdBQVcsYUFBYSxFQUFFRyxnQkFBZ0I7SUFDckYsQ0FBQztRQUVELHdEQUF3RDtRQUN4RCxNQUFNRyxhQUFhLE1BQU1mLG1EQUFLQSxDQUFDZ0IsTUFBTSxDQUFDQyxlQUFlLENBQUM7WUFDcERDLE9BQU87WUFDUEMsVUFBVTtnQkFBQztvQkFBRUMsTUFBTTtvQkFBUUMsT0FBTzt3QkFBQzs0QkFBRUMsTUFBTVI7d0JBQU87cUJBQUU7Z0JBQUM7YUFBRTtRQUN6RDtRQUNBUyxRQUFRQyxHQUFHLENBQUNUO1FBQ1osTUFBTVUsZ0JBQWdCVixXQUFXVyxVQUFVLENBQUMsRUFBRSxDQUFDQyxPQUFPLENBQUNOLEtBQUssQ0FBQyxFQUFFLENBQUNDLElBQUk7UUFFcEUsTUFBTU0sWUFBWUgsY0FBY0ksSUFBSSxHQUFHQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtRQUNoRSxNQUFNQyxXQUFXQyxLQUFLQyxLQUFLLENBQUNMO1FBQzVCLE1BQU1NLFdBQVcsTUFBTWhDLG1EQUFFQSxDQUN0QmlDLE1BQU0sQ0FBQ2hDLGlFQUFvQkEsRUFDM0JpQyxNQUFNLENBQUM7WUFDTjVCO1lBQ0FDO1lBQ0FDO1lBQ0FDO1lBQ0FDO1lBQ0F5QixjQUFjTjtRQUNoQixHQUNDTyxTQUFTLENBQUM7WUFBRUMsTUFBTXBDLGlFQUFvQkE7UUFBQztRQUUxQyxNQUFNcUMsU0FBUyxNQUFNcEMsb0RBQU9BLENBQUNxQyxJQUFJLENBQUM7WUFDaENDLE1BQU07WUFDTkMsTUFBTTtnQkFDSkMsUUFBUVYsUUFBUSxDQUFDLEVBQUUsQ0FBQ0ssSUFBSTtZQUMxQjtRQUNGO1FBQ0FoQixRQUFRQyxHQUFHLENBQUNnQjtRQUVaLE9BQU92QyxxREFBWUEsQ0FBQ1ksSUFBSSxDQUFDO1lBQUUyQixRQUFRTixRQUFRLENBQUMsRUFBRTtRQUFDO0lBQ2pELEVBQUUsT0FBT1csT0FBTztRQUNkdEIsUUFBUXNCLEtBQUssQ0FBQyxvQkFBb0JBO1FBQ2xDLE9BQU81QyxxREFBWUEsQ0FBQ1ksSUFBSSxDQUN0QjtZQUFFZ0MsT0FBTztZQUF5QkMsU0FBU0QsTUFBTUUsT0FBTztRQUFDLEdBQ3pEO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXFZpbmF5YWtcXERlc2t0b3BcXEZ1bGxfU3RhY2tfUHJvamVjdHNcXHByZXAtYWlcXGFwcFxcYXBpXFxnZW5lcmF0ZS1jb3Vyc2Utb3V0bGluZVxccm91dGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHsgY291cnNlT3V0bGluZUdlbmVyYXRlQUlNb2RlbCB9IGZyb20gXCJAL2NvbmZpZ3MvQWlNb2RlbFwiO1xyXG4vLyBpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcclxuLy8gaW1wb3J0IGRiIGZyb20gXCJAL2NvbmZpZ3MvZGJcIjtcclxuLy8gaW1wb3J0IHsgU1RVRFlfTUFURVJJQUxfVEFCTEUgfSBmcm9tIFwiQC9jb25maWdzL3NjaGVtYVwiO1xyXG5cclxuLy8gZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxKSB7XHJcbi8vICAgdHJ5IHtcclxuLy8gICAgIGNvbnN0IHsgY291cnNlSWQsIGNvdXJzZVR5cGUsIHRvcGljLCBjcmVhdGVkQnksIGRpZmZpY3VsdHlMZXZlbCB9ID1cclxuLy8gICAgICAgYXdhaXQgcmVxLmpzb24oKTtcclxuXHJcbi8vICAgICBjb25zdCBQUk9NUFQgPSBgR2VuZXJhdGUgY29tcHJlaGVuc2l2ZSBzdHVkeSBtYXRlcmlhbCBmb3IgdGhlIHRvcGljIFwiJHt0b3BpY31cIiBmb3IgYSBcIiR7Y291cnNlVHlwZX1cIiBjb3Vyc2UgYXQgXCIke2RpZmZpY3VsdHlMZXZlbH1cIiBsZXZlbCwgYW5kIHByb3ZpZGUgdGhlIHJlc3VsdCBzdHJpY3RseSBpbiB2YWxpZCBKU09OIGZvcm1hdCBjb250YWluaW5nOiBhIENvdXJzZVN1bW1hcnkgZ2l2aW5nIGFuIG92ZXJ2aWV3IG9mIHRoZSBlbnRpcmUgY291cnNlOyBhIENoYXB0ZXJzIGFycmF5LCB3aGVyZSBlYWNoIGNoYXB0ZXIgaGFzIGEgQ2hhcHRlclRpdGxlLCBhIENoYXB0ZXJTdW1tYXJ5IGV4cGxhaW5pbmcgdGhlIGNoYXB0ZXIsIGFuZCBhIFRvcGljcyBhcnJheSBsaXN0aW5nIGtleSB0b3BpY3MgaW4gdGhhdCBjaGFwdGVyLiBVc2UgY2xlYXIsIGNvbmNpc2UgbGFuZ3VhZ2Ugc3VpdGFibGUgZm9yIHRoZSBkaWZmaWN1bHR5IGxldmVsLCBrZWVwIHRoZSBKU09OIGNsZWFuIGFuZCBjb25zaXN0ZW50LCBhbmQgZG8gbm90IGluY2x1ZGUgYW55IGV4dHJhIHRleHQgb3IgZXhwbGFuYXRpb25zIG91dHNpZGUgdGhlIEpTT04gb3V0cHV0LmA7XHJcblxyXG4vLyAgICAgLy8g4pyFIENvcnJlY3Q6IGdldCB0aGUgR2VuZXJhdGl2ZSBNb2RlbCBmcm9tIHlvdXIgZXhwb3J0ZWQgaW5zdGFuY2VcclxuLy8gICAgIGNvbnN0IG1vZGVsID0gY291cnNlT3V0bGluZUdlbmVyYXRlQUlNb2RlbC5nZXRHZW5lcmF0aXZlTW9kZWwoe1xyXG4vLyAgICAgICBtb2RlbDogXCJnZW1pbmktMi4wLWZsYXNoLWxpdGVcIixcclxuLy8gICAgIH0pO1xyXG5cclxuLy8gICAgIC8vIOKchSBDYWxsIGdlbmVyYXRlQ29udGVudCBwcm9wZXJseSAobm90IG9uIHRoZSByYXcgaW5zdGFuY2UpXHJcbi8vICAgICBjb25zdCBhaVJlc3BvbnNlID0gYXdhaXQgbW9kZWwuZ2VuZXJhdGVDb250ZW50KFtQUk9NUFRdKTtcclxuXHJcbi8vICAgICAvLyDinIUgRXh0cmFjdCBnZW5lcmF0ZWQgdGV4dCBwcm9wZXJseVxyXG4vLyAgICAgY29uc3QgZ2VuZXJhdGVkVGV4dCA9XHJcbi8vICAgICAgIGFpUmVzcG9uc2UucmVzcG9uc2UuY2FuZGlkYXRlc1swXS5jb250ZW50LnBhcnRzWzBdLnRleHQ7XHJcblxyXG4vLyAgICAgY29uc29sZS5sb2coXCJHZW5lcmF0ZWQgVGV4dDpcIiwgZ2VuZXJhdGVkVGV4dCk7XHJcblxyXG4vLyAgICAgLy8g4pyFIFNhZmVseSBwYXJzZSBKU09OIG9ubHkgZnJvbSB0aGUgSlNPTiBibG9ja1xyXG4vLyAgICAgY29uc3QgY2xlYW5Kc29uID0gZ2VuZXJhdGVkVGV4dC50cmltKCkubWF0Y2goL1xce1tcXHNcXFNdKlxcfS8pPy5bMF07XHJcbi8vICAgICBjb25zdCBhaVJlc3VsdCA9IEpTT04ucGFyc2UoY2xlYW5Kc29uKTtcclxuXHJcbi8vICAgICAvLyDinIUgSW5zZXJ0IGludG8gREJcclxuLy8gICAgIGNvbnN0IGRiUmVzdWx0ID0gYXdhaXQgZGJcclxuLy8gICAgICAgLmluc2VydChTVFVEWV9NQVRFUklBTF9UQUJMRSlcclxuLy8gICAgICAgLnZhbHVlcyh7XHJcbi8vICAgICAgICAgY291cnNlSWQsXHJcbi8vICAgICAgICAgY291cnNlVHlwZSxcclxuLy8gICAgICAgICB0b3BpYyxcclxuLy8gICAgICAgICBjcmVhdGVkQnksXHJcbi8vICAgICAgICAgZGlmZmljdWx0eUxldmVsLFxyXG4vLyAgICAgICAgIGNvdXJzZUxheW91dDogYWlSZXN1bHQsIC8vIG9yIEpTT04uc3RyaW5naWZ5KGFpUmVzdWx0KSBpZiB5b3VyIGNvbHVtbiBpcyBURVhUXHJcbi8vICAgICAgIH0pXHJcbi8vICAgICAgIC5yZXR1cm5pbmcoKTtcclxuXHJcbi8vICAgICBjb25zb2xlLmxvZyhcIkRCIEluc2VydCBSZXN1bHQ6XCIsIGRiUmVzdWx0KTtcclxuXHJcbi8vICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyByZXN1bHQ6IGRiUmVzdWx0WzBdIH0pO1xyXG4vLyAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbi8vICAgICBjb25zb2xlLmVycm9yKFwiQVBJIFJvdXRlIEVycm9yOlwiLCBlcnJvcik7XHJcbi8vICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbi8vICAgICAgIHsgZXJyb3I6IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIsIGRldGFpbHM6IGVycm9yLm1lc3NhZ2UgfSxcclxuLy8gICAgICAgeyBzdGF0dXM6IDUwMCB9XHJcbi8vICAgICApO1xyXG4vLyAgIH1cclxuLy8gfVxyXG5pbXBvcnQgeyBnZW5BSSB9IGZyb20gXCJAL2NvbmZpZ3MvQWlNb2RlbFwiO1xyXG5pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcclxuaW1wb3J0IGRiIGZyb20gXCJAL2NvbmZpZ3MvZGJcIjtcclxuaW1wb3J0IHsgU1RVRFlfTUFURVJJQUxfVEFCTEUgfSBmcm9tIFwiQC9jb25maWdzL3NjaGVtYVwiO1xyXG5pbXBvcnQgeyBpbm5nZXN0IH0gZnJvbSBcIkAvaW5uZ2VzdC9jbGllbnRcIjtcclxuZXhwb3J0IGNvbnN0IGR5bmFtaWMgPSBcImZvcmNlLWR5bmFtaWNcIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcSkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB7IGNvdXJzZUlkLCBjb3Vyc2VUeXBlLCB0b3BpYywgY3JlYXRlZEJ5LCBkaWZmaWN1bHR5TGV2ZWwgfSA9XHJcbiAgICAgIGF3YWl0IHJlcS5qc29uKCk7XHJcblxyXG4gICAgY29uc3QgUFJPTVBUID0gYFxyXG4gICAgWW91IGFyZSBhbiBleHBlcnQgY291cnNlIGNvbnRlbnQgY3JlYXRvci4gXHJcbiAgICBHZW5lcmF0ZSBhIGNvbXByZWhlbnNpdmUgc3R1ZHkgbWF0ZXJpYWwgc3RyaWN0bHkgaW4gVkFMSUQgSlNPTiBvbmx5IGluIHRoZSBmb2xsb3dpbmcgc3RydWN0dXJlOlxyXG4gICAgXHJcbiAgICB7XHJcbiAgICAgIFwiQ291cnNlU3VtbWFyeVwiOiB7XHJcbiAgICAgICAgXCJDb3Vyc2VOYW1lXCI6IFwiLi4uXCIsXHJcbiAgICAgICAgXCJDb3Vyc2VMZXZlbFwiOiBcIi4uLlwiLFxyXG4gICAgICAgIFwiQ291cnNlQ2F0ZWdvcnlcIjogXCIuLi5cIixcclxuICAgICAgICBcIkNvdXJzZURlc2NyaXB0aW9uXCI6IFwiLi4uXCIsXHJcbiAgICAgICAgXCJQcmVyZXF1aXNpdGVzXCI6IFtdLFxyXG4gICAgICAgIFwiTGVhcm5pbmdPYmplY3RpdmVzXCI6IFtdLFxyXG4gICAgICAgIFwiQXNzZXNzbWVudE1ldGhvZHNcIjogW10sXHJcbiAgICAgICAgXCJSZWNvbW1lbmRlZFJlc291cmNlc1wiOiBbXVxyXG4gICAgICB9LFxyXG4gICAgICBcIkNoYXB0ZXJzXCI6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcIkNoYXB0ZXJUaXRsZVwiOiBcIi4uLlwiLFxyXG4gICAgICAgICAgXCJDaGFwdGVyRGVzY3JpcHRpb25cIjogXCIuLi5cIixcclxuICAgICAgICAgIFwiVG9waWNzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwiVG9waWNUaXRsZVwiOiBcIi4uLlwiLFxyXG4gICAgICAgICAgICAgIFwiVG9waWNEZXNjcmlwdGlvblwiOiBcIi4uLlwiLFxyXG4gICAgICAgICAgICAgIFwiU3VidG9waWNzXCI6IFtdLFxyXG4gICAgICAgICAgICAgIFwiUHJhY3RpY2VQcm9ibGVtc1wiOiBbXSxcclxuICAgICAgICAgICAgICBcIlRpcHNBbmRUcmlja3NcIjogW11cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIFwiUXVpelF1ZXN0aW9uc1wiOiBbXVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfVxyXG4gICAgICBZb3UgbXVzdCByZXR1cm4geW91ciBmaW5hbCBhbnN3ZXIgc3RyaWN0bHkgd3JhcHBlZCBpbjpcclxuXFxgXFxgXFxganNvblxyXG57XHJcbiAgLi4uIHZhbGlkIEpTT04gLi4uXHJcbn1cclxuXFxgXFxgXFxgXHJcblxyXG5OZXZlciBhZGQgZXhwbGFuYXRpb25zLCBqdXN0IHRoZSBKU09OIGJsb2NrLlxyXG5cclxuICAgIFxyXG4gICAgUmVxdWlyZW1lbnRzOlxyXG4gICAgLSBGb2xsb3cgdGhlIGV4YWN0IEpTT04gZmllbGQgbmFtZXMgYXMgZ2l2ZW4gYWJvdmUuXHJcbiAgICAtIERvIG5vdCBpbmNsdWRlIGFueSBleHBsYW5hdGlvbiwgZXh0cmEgdGV4dCwgb3Igbm90ZXMg4oCUIG9ubHkgb3V0cHV0IGEgc2luZ2xlIHZhbGlkIEpTT04gb2JqZWN0LlxyXG4gICAgLSBNYWtlIHN1cmUgdGhlIEpTT04gaXMgc3ludGFjdGljYWxseSBjb3JyZWN0LlxyXG4gICAgLSBGaWxsIGluIHJlYWxpc3RpYywgaGlnaC1xdWFsaXR5IGNvbnRlbnQgZm9yIGVhY2ggZmllbGQsIHN1YnRvcGljLCBwcm9ibGVtLCBhbmQgcXVpeiBxdWVzdGlvbi5cclxuICAgIC0gVGhlIGNvdXJzZSB0b3BpYyBpcyBcIiR7dG9waWN9XCIsIGZvciBhIFwiJHtjb3Vyc2VUeXBlfVwiIGNvdXJzZSBhdCBcIiR7ZGlmZmljdWx0eUxldmVsfVwiIGxldmVsLlxyXG4gICAgYDtcclxuXHJcbiAgICAvLyDinIUgQ2FsbCB0aGUgTm9kZSBTREsgcHJvcGVybHkgKG5vIC5nZXRHZW5lcmF0aXZlTW9kZWwpXHJcbiAgICBjb25zdCBhaVJlc3BvbnNlID0gYXdhaXQgZ2VuQUkubW9kZWxzLmdlbmVyYXRlQ29udGVudCh7XHJcbiAgICAgIG1vZGVsOiBcImdlbWluaS0yLjAtZmxhc2gtbGl0ZVwiLCAvLyBvciBcImdlbWluaS0yLjAtZmxhc2hcIlxyXG4gICAgICBjb250ZW50czogW3sgcm9sZTogXCJ1c2VyXCIsIHBhcnRzOiBbeyB0ZXh0OiBQUk9NUFQgfV0gfV0sXHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUubG9nKGFpUmVzcG9uc2UpO1xyXG4gICAgY29uc3QgZ2VuZXJhdGVkVGV4dCA9IGFpUmVzcG9uc2UuY2FuZGlkYXRlc1swXS5jb250ZW50LnBhcnRzWzBdLnRleHQ7XHJcblxyXG4gICAgY29uc3QgY2xlYW5Kc29uID0gZ2VuZXJhdGVkVGV4dC50cmltKCkubWF0Y2goL1xce1tcXHNcXFNdKlxcfS8pPy5bMF07XHJcbiAgICBjb25zdCBhaVJlc3VsdCA9IEpTT04ucGFyc2UoY2xlYW5Kc29uKTtcclxuICAgIGNvbnN0IGRiUmVzdWx0ID0gYXdhaXQgZGJcclxuICAgICAgLmluc2VydChTVFVEWV9NQVRFUklBTF9UQUJMRSlcclxuICAgICAgLnZhbHVlcyh7XHJcbiAgICAgICAgY291cnNlSWQsXHJcbiAgICAgICAgY291cnNlVHlwZSxcclxuICAgICAgICB0b3BpYyxcclxuICAgICAgICBjcmVhdGVkQnksXHJcbiAgICAgICAgZGlmZmljdWx0eUxldmVsLFxyXG4gICAgICAgIGNvdXJzZUxheW91dDogYWlSZXN1bHQsXHJcbiAgICAgIH0pXHJcbiAgICAgIC5yZXR1cm5pbmcoeyByZXNwOiBTVFVEWV9NQVRFUklBTF9UQUJMRSB9KTtcclxuXHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBpbm5nZXN0LnNlbmQoe1xyXG4gICAgICBuYW1lOiBcIm5vdGVzLmdlbmVyYXRlXCIsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBjb3Vyc2U6IGRiUmVzdWx0WzBdLnJlc3AsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgcmVzdWx0OiBkYlJlc3VsdFswXSB9KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkFQSSBSb3V0ZSBFcnJvcjpcIiwgZXJyb3IpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICB7IGVycm9yOiBcIkludGVybmFsIFNlcnZlciBFcnJvclwiLCBkZXRhaWxzOiBlcnJvci5tZXNzYWdlIH0sXHJcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbImdlbkFJIiwiTmV4dFJlc3BvbnNlIiwiZGIiLCJTVFVEWV9NQVRFUklBTF9UQUJMRSIsImlubmdlc3QiLCJkeW5hbWljIiwiUE9TVCIsInJlcSIsImNvdXJzZUlkIiwiY291cnNlVHlwZSIsInRvcGljIiwiY3JlYXRlZEJ5IiwiZGlmZmljdWx0eUxldmVsIiwianNvbiIsIlBST01QVCIsImFpUmVzcG9uc2UiLCJtb2RlbHMiLCJnZW5lcmF0ZUNvbnRlbnQiLCJtb2RlbCIsImNvbnRlbnRzIiwicm9sZSIsInBhcnRzIiwidGV4dCIsImNvbnNvbGUiLCJsb2ciLCJnZW5lcmF0ZWRUZXh0IiwiY2FuZGlkYXRlcyIsImNvbnRlbnQiLCJjbGVhbkpzb24iLCJ0cmltIiwibWF0Y2giLCJhaVJlc3VsdCIsIkpTT04iLCJwYXJzZSIsImRiUmVzdWx0IiwiaW5zZXJ0IiwidmFsdWVzIiwiY291cnNlTGF5b3V0IiwicmV0dXJuaW5nIiwicmVzcCIsInJlc3VsdCIsInNlbmQiLCJuYW1lIiwiZGF0YSIsImNvdXJzZSIsImVycm9yIiwiZGV0YWlscyIsIm1lc3NhZ2UiLCJzdGF0dXMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/generate-course-outline/route.js\n");

/***/ }),

/***/ "(rsc)/./configs/AiModel.js":
/*!****************************!*\
  !*** ./configs/AiModel.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   genAI: () => (/* binding */ genAI),\n/* harmony export */   generateNotesAIModel: () => (/* binding */ generateNotesAIModel),\n/* harmony export */   generateQAAIModel: () => (/* binding */ generateQAAIModel),\n/* harmony export */   generateQuizAIModel: () => (/* binding */ generateQuizAIModel),\n/* harmony export */   generateStudyTypeContentAiModel: () => (/* binding */ generateStudyTypeContentAiModel)\n/* harmony export */ });\n/* harmony import */ var _google_genai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @google/genai */ \"(rsc)/./node_modules/@google/genai/dist/node/index.mjs\");\n// To run this code you need to install the following dependencies:\n// npm install @google/genai mime\n// npm install -D @types/node\n// import { GoogleGenAI } from \"@google/genai\";\n// export const courseOutlineGenerateAIModel = new GoogleGenAI({\n//   apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,\n// });\n// const config = {\n//   responseMimeType: \"application/json\",\n// };\n// const model = \"gemini-2.0-flash-lite\";\n// const contents = [\n//   {\n//     role: \"user\",\n//     parts: [\n//       {\n//         text: ` \\`Generate comprehensive study material for the topic \"${coding}\" for a \"${Python}\" course at \"${moderate}\" level, and provide the result strictly in valid JSON format containing: a CourseSummary giving an overview of the entire course; a Chapters array, where each chapter has a ChapterTitle, a ChapterSummary explaining the chapter, and a Topics array listing key topics in that chapter. Use clear, concise language suitable for the difficulty level, keep the JSON clean and consistent, and do not include any extra text or explanations outside the JSON output.\\`;\n// `,\n//       },\n//     ],\n//   },\n//   {\n//     role: \"model\",\n//     parts: [\n//       {\n//         text: `\\`\\`\\`json\n// {\n//   \"CourseSummary\": {\n//     \"CourseName\": \"Python Coding - Moderate Level\",\n//     \"CourseDescription\": \"This course provides a comprehensive understanding of Python coding, building upon introductory concepts. It covers advanced data structures, object-oriented programming, file handling, error handling, and introduction to modules and packages. The course prepares learners to write more complex and efficient Python code.\",\n//     \"DifficultyLevel\": \"Moderate\",\n//     \"Prerequisites\": \"Basic Python knowledge (variables, data types, control flow, functions).\"\n//   },\n//   \"Chapters\": [\n//     {\n//       \"ChapterTitle\": \"Advanced Data Structures\",\n//       \"ChapterSummary\": \"This chapter delves into more sophisticated data structures beyond lists, dictionaries, and tuples. It covers sets, comprehensions, and explores the strengths and weaknesses of each in various use cases.\",\n//       \"Topics\": [\n//         \"Sets and their operations (union, intersection, difference)\",\n//         \"List comprehensions and their benefits\",\n//         \"Dictionary comprehensions\",\n//         \"Set comprehensions\",\n//         \"Comparison of data structure performance\"\n//       ]\n//     },\n//     {\n//       \"ChapterTitle\": \"Object-Oriented Programming (OOP) - Part 1\",\n//       \"ChapterSummary\": \"An introduction to the fundamentals of object-oriented programming. This chapter focuses on classes, objects, and basic OOP concepts such as encapsulation, inheritance, and polymorphism.\",\n//       \"Topics\": [\n//         \"Classes and objects\",\n//         \"Attributes and methods\",\n//         \"Encapsulation (public, private, protected attributes)\",\n//         \"Inheritance (single and multiple)\",\n//         \"Polymorphism (method overriding)\"\n//       ]\n//     },\n//     {\n//       \"ChapterTitle\": \"Object-Oriented Programming (OOP) - Part 2\",\n//       \"ChapterSummary\": \"Building upon the OOP basics, this chapter explores more advanced concepts like abstract classes, interfaces, and design patterns, further improving code organization and reusability.\",\n//       \"Topics\": [\n//         \"Abstract classes and methods\",\n//         \"Interfaces (using abstract base classes)\",\n//         \"Class methods and static methods\",\n//         \"Magic methods (dunder methods)\",\n//         \"Design patterns (brief introduction)\"\n//       ]\n//     },\n//     {\n//       \"ChapterTitle\": \"File Handling\",\n//       \"ChapterSummary\": \"Learn how to interact with files, including reading from and writing to text and binary files. This includes error handling when working with files.\",\n//       \"Topics\": [\n//         \"Opening and closing files\",\n//         \"Reading and writing text files\",\n//         \"Reading and writing binary files\",\n//         \"File modes (read, write, append)\",\n//         \"Context managers (with statement)\",\n//         \"Error handling (e.g., FileNotFoundError)\"\n//       ]\n//     },\n//     {\n//       \"ChapterTitle\": \"Error Handling and Exception Handling\",\n//       \"ChapterSummary\": \"Master the techniques for anticipating and handling errors in Python. This chapter introduces try-except blocks, raising exceptions, and creating custom exception classes.\",\n//       \"Topics\": [\n//         \"Try-except blocks\",\n//         \"Specific exception types\",\n//         \"The finally block\",\n//         \"Raising exceptions (raise keyword)\",\n//         \"Creating custom exception classes\"\n//       ]\n//     },\n//     {\n//       \"ChapterTitle\": \"Modules and Packages\",\n//       \"ChapterSummary\": \"Learn how to organize code into reusable modules and packages. This chapter covers importing modules, using packages, and creating your own modules and packages.\",\n//       \"Topics\": [\n//         \"Importing modules (import statements)\",\n//         \"Importing specific items from modules\",\n//         \"Creating and using packages\",\n//         \"The \\`__init__.py\\` file\",\n//         \"Relative and absolute imports\"\n//       ]\n//     },\n//     {\n//       \"ChapterTitle\": \"Introduction to Regular Expressions\",\n//       \"ChapterSummary\": \"This chapter provides an introduction to regular expressions (regex) and their use in pattern matching within strings. \",\n//       \"Topics\": [\n//           \"Basic Regex Syntax\",\n//           \"Matching patterns with re module\",\n//           \"Character classes\",\n//           \"Quantifiers\",\n//           \"Grouping and capturing\"\n//       ]\n//     }\n//   ]\n// }\n// \\`\\`\\``,\n//       },\n//     ],\n//   },\n// ];\n//   const response = await ai.models.generateContentStream({\n//     model,\n//     config,\n//     contents,\n//   });\n//   let fileIndex = 0;\n//   for await (const chunk of response) {\n//     console.log(chunk.text);\n//   }\n// }\n\nconst genAI = new _google_genai__WEBPACK_IMPORTED_MODULE_0__.GoogleGenAI({\n    apiKey: \"AIzaSyChls2rKeiuswh6dCwzzs_5iE_YlOKtORU\"\n});\nconst generateNotesAIModel = new _google_genai__WEBPACK_IMPORTED_MODULE_0__.GoogleGenAI({\n    apiKey: \"AIzaSyChls2rKeiuswh6dCwzzs_5iE_YlOKtORU\"\n});\nconst generateStudyTypeContentAiModel = new _google_genai__WEBPACK_IMPORTED_MODULE_0__.GoogleGenAI({\n    apiKey: \"AIzaSyChls2rKeiuswh6dCwzzs_5iE_YlOKtORU\"\n});\nconst generateQuizAIModel = new _google_genai__WEBPACK_IMPORTED_MODULE_0__.GoogleGenAI({\n    apiKey: \"AIzaSyChls2rKeiuswh6dCwzzs_5iE_YlOKtORU\"\n});\nconst generateQAAIModel = new _google_genai__WEBPACK_IMPORTED_MODULE_0__.GoogleGenAI({\n    apiKey: \"AIzaSyChls2rKeiuswh6dCwzzs_5iE_YlOKtORU\"\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9jb25maWdzL0FpTW9kZWwuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsbUVBQW1FO0FBQ25FLGlDQUFpQztBQUNqQyw2QkFBNkI7QUFFN0IsK0NBQStDO0FBRS9DLGdFQUFnRTtBQUNoRSxvREFBb0Q7QUFDcEQsTUFBTTtBQUNOLG1CQUFtQjtBQUNuQiwwQ0FBMEM7QUFDMUMsS0FBSztBQUNMLHlDQUF5QztBQUN6QyxxQkFBcUI7QUFDckIsTUFBTTtBQUNOLG9CQUFvQjtBQUNwQixlQUFlO0FBQ2YsVUFBVTtBQUNWLHlrQkFBeWtCO0FBQ3prQixLQUFLO0FBQ0wsV0FBVztBQUNYLFNBQVM7QUFDVCxPQUFPO0FBQ1AsTUFBTTtBQUNOLHFCQUFxQjtBQUNyQixlQUFlO0FBQ2YsVUFBVTtBQUNWLDRCQUE0QjtBQUM1QixJQUFJO0FBQ0osdUJBQXVCO0FBQ3ZCLHNEQUFzRDtBQUN0RCxnV0FBZ1c7QUFDaFcscUNBQXFDO0FBQ3JDLGtHQUFrRztBQUNsRyxPQUFPO0FBQ1Asa0JBQWtCO0FBQ2xCLFFBQVE7QUFDUixvREFBb0Q7QUFDcEQseU9BQXlPO0FBQ3pPLG9CQUFvQjtBQUNwQix5RUFBeUU7QUFDekUsb0RBQW9EO0FBQ3BELHVDQUF1QztBQUN2QyxnQ0FBZ0M7QUFDaEMscURBQXFEO0FBQ3JELFVBQVU7QUFDVixTQUFTO0FBQ1QsUUFBUTtBQUNSLHNFQUFzRTtBQUN0RSx3TkFBd047QUFDeE4sb0JBQW9CO0FBQ3BCLGlDQUFpQztBQUNqQyxvQ0FBb0M7QUFDcEMsbUVBQW1FO0FBQ25FLCtDQUErQztBQUMvQyw2Q0FBNkM7QUFDN0MsVUFBVTtBQUNWLFNBQVM7QUFDVCxRQUFRO0FBQ1Isc0VBQXNFO0FBQ3RFLHFOQUFxTjtBQUNyTixvQkFBb0I7QUFDcEIsMENBQTBDO0FBQzFDLHNEQUFzRDtBQUN0RCw4Q0FBOEM7QUFDOUMsNENBQTRDO0FBQzVDLGlEQUFpRDtBQUNqRCxVQUFVO0FBQ1YsU0FBUztBQUNULFFBQVE7QUFDUix5Q0FBeUM7QUFDekMsa0xBQWtMO0FBQ2xMLG9CQUFvQjtBQUNwQix1Q0FBdUM7QUFDdkMsNENBQTRDO0FBQzVDLDhDQUE4QztBQUM5Qyw4Q0FBOEM7QUFDOUMsK0NBQStDO0FBQy9DLHFEQUFxRDtBQUNyRCxVQUFVO0FBQ1YsU0FBUztBQUNULFFBQVE7QUFDUixpRUFBaUU7QUFDakUseU1BQXlNO0FBQ3pNLG9CQUFvQjtBQUNwQiwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLCtCQUErQjtBQUMvQixnREFBZ0Q7QUFDaEQsOENBQThDO0FBQzlDLFVBQVU7QUFDVixTQUFTO0FBQ1QsUUFBUTtBQUNSLGdEQUFnRDtBQUNoRCwrTEFBK0w7QUFDL0wsb0JBQW9CO0FBQ3BCLG1EQUFtRDtBQUNuRCxtREFBbUQ7QUFDbkQseUNBQXlDO0FBQ3pDLHNDQUFzQztBQUN0QywwQ0FBMEM7QUFDMUMsVUFBVTtBQUNWLFNBQVM7QUFDVCxRQUFRO0FBQ1IsK0RBQStEO0FBQy9ELHFKQUFxSjtBQUNySixvQkFBb0I7QUFDcEIsa0NBQWtDO0FBQ2xDLGdEQUFnRDtBQUNoRCxpQ0FBaUM7QUFDakMsMkJBQTJCO0FBQzNCLHFDQUFxQztBQUNyQyxVQUFVO0FBQ1YsUUFBUTtBQUNSLE1BQU07QUFDTixJQUFJO0FBQ0osV0FBVztBQUNYLFdBQVc7QUFDWCxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUs7QUFFTCw2REFBNkQ7QUFDN0QsYUFBYTtBQUNiLGNBQWM7QUFDZCxnQkFBZ0I7QUFDaEIsUUFBUTtBQUNSLHVCQUF1QjtBQUN2QiwwQ0FBMEM7QUFDMUMsK0JBQStCO0FBQy9CLE1BQU07QUFDTixJQUFJO0FBRXdDO0FBRXJDLE1BQU1DLFFBQVEsSUFBSUQsc0RBQVdBLENBQUM7SUFDbkNFLFFBQVFDLHlDQUFzQztBQUNoRCxHQUFHO0FBRUksTUFBTUcsdUJBQXVCLElBQUlOLHNEQUFXQSxDQUFDO0lBQ2xERSxRQUFRQyx5Q0FBc0M7QUFDaEQsR0FBRztBQUVJLE1BQU1JLGtDQUFrQyxJQUFJUCxzREFBV0EsQ0FBQztJQUM3REUsUUFBUUMseUNBQXNDO0FBQ2hELEdBQUc7QUFDSSxNQUFNSyxzQkFBcUIsSUFBSVIsc0RBQVdBLENBQUM7SUFDaERFLFFBQVFDLHlDQUFzQztBQUNoRCxHQUFHO0FBQ0ksTUFBTU0sb0JBQW9CLElBQUlULHNEQUFXQSxDQUFDO0lBQy9DRSxRQUFRQyx5Q0FBc0M7QUFDaEQsR0FBRyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxWaW5heWFrXFxEZXNrdG9wXFxGdWxsX1N0YWNrX1Byb2plY3RzXFxwcmVwLWFpXFxjb25maWdzXFxBaU1vZGVsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRvIHJ1biB0aGlzIGNvZGUgeW91IG5lZWQgdG8gaW5zdGFsbCB0aGUgZm9sbG93aW5nIGRlcGVuZGVuY2llczpcclxuLy8gbnBtIGluc3RhbGwgQGdvb2dsZS9nZW5haSBtaW1lXHJcbi8vIG5wbSBpbnN0YWxsIC1EIEB0eXBlcy9ub2RlXHJcblxyXG4vLyBpbXBvcnQgeyBHb29nbGVHZW5BSSB9IGZyb20gXCJAZ29vZ2xlL2dlbmFpXCI7XHJcblxyXG4vLyBleHBvcnQgY29uc3QgY291cnNlT3V0bGluZUdlbmVyYXRlQUlNb2RlbCA9IG5ldyBHb29nbGVHZW5BSSh7XHJcbi8vICAgYXBpS2V5OiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19HRU1JTklfQVBJX0tFWSxcclxuLy8gfSk7XHJcbi8vIGNvbnN0IGNvbmZpZyA9IHtcclxuLy8gICByZXNwb25zZU1pbWVUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuLy8gfTtcclxuLy8gY29uc3QgbW9kZWwgPSBcImdlbWluaS0yLjAtZmxhc2gtbGl0ZVwiO1xyXG4vLyBjb25zdCBjb250ZW50cyA9IFtcclxuLy8gICB7XHJcbi8vICAgICByb2xlOiBcInVzZXJcIixcclxuLy8gICAgIHBhcnRzOiBbXHJcbi8vICAgICAgIHtcclxuLy8gICAgICAgICB0ZXh0OiBgIFxcYEdlbmVyYXRlIGNvbXByZWhlbnNpdmUgc3R1ZHkgbWF0ZXJpYWwgZm9yIHRoZSB0b3BpYyBcIiR7Y29kaW5nfVwiIGZvciBhIFwiJHtQeXRob259XCIgY291cnNlIGF0IFwiJHttb2RlcmF0ZX1cIiBsZXZlbCwgYW5kIHByb3ZpZGUgdGhlIHJlc3VsdCBzdHJpY3RseSBpbiB2YWxpZCBKU09OIGZvcm1hdCBjb250YWluaW5nOiBhIENvdXJzZVN1bW1hcnkgZ2l2aW5nIGFuIG92ZXJ2aWV3IG9mIHRoZSBlbnRpcmUgY291cnNlOyBhIENoYXB0ZXJzIGFycmF5LCB3aGVyZSBlYWNoIGNoYXB0ZXIgaGFzIGEgQ2hhcHRlclRpdGxlLCBhIENoYXB0ZXJTdW1tYXJ5IGV4cGxhaW5pbmcgdGhlIGNoYXB0ZXIsIGFuZCBhIFRvcGljcyBhcnJheSBsaXN0aW5nIGtleSB0b3BpY3MgaW4gdGhhdCBjaGFwdGVyLiBVc2UgY2xlYXIsIGNvbmNpc2UgbGFuZ3VhZ2Ugc3VpdGFibGUgZm9yIHRoZSBkaWZmaWN1bHR5IGxldmVsLCBrZWVwIHRoZSBKU09OIGNsZWFuIGFuZCBjb25zaXN0ZW50LCBhbmQgZG8gbm90IGluY2x1ZGUgYW55IGV4dHJhIHRleHQgb3IgZXhwbGFuYXRpb25zIG91dHNpZGUgdGhlIEpTT04gb3V0cHV0LlxcYDtcclxuLy8gYCxcclxuLy8gICAgICAgfSxcclxuLy8gICAgIF0sXHJcbi8vICAgfSxcclxuLy8gICB7XHJcbi8vICAgICByb2xlOiBcIm1vZGVsXCIsXHJcbi8vICAgICBwYXJ0czogW1xyXG4vLyAgICAgICB7XHJcbi8vICAgICAgICAgdGV4dDogYFxcYFxcYFxcYGpzb25cclxuLy8ge1xyXG4vLyAgIFwiQ291cnNlU3VtbWFyeVwiOiB7XHJcbi8vICAgICBcIkNvdXJzZU5hbWVcIjogXCJQeXRob24gQ29kaW5nIC0gTW9kZXJhdGUgTGV2ZWxcIixcclxuLy8gICAgIFwiQ291cnNlRGVzY3JpcHRpb25cIjogXCJUaGlzIGNvdXJzZSBwcm92aWRlcyBhIGNvbXByZWhlbnNpdmUgdW5kZXJzdGFuZGluZyBvZiBQeXRob24gY29kaW5nLCBidWlsZGluZyB1cG9uIGludHJvZHVjdG9yeSBjb25jZXB0cy4gSXQgY292ZXJzIGFkdmFuY2VkIGRhdGEgc3RydWN0dXJlcywgb2JqZWN0LW9yaWVudGVkIHByb2dyYW1taW5nLCBmaWxlIGhhbmRsaW5nLCBlcnJvciBoYW5kbGluZywgYW5kIGludHJvZHVjdGlvbiB0byBtb2R1bGVzIGFuZCBwYWNrYWdlcy4gVGhlIGNvdXJzZSBwcmVwYXJlcyBsZWFybmVycyB0byB3cml0ZSBtb3JlIGNvbXBsZXggYW5kIGVmZmljaWVudCBQeXRob24gY29kZS5cIixcclxuLy8gICAgIFwiRGlmZmljdWx0eUxldmVsXCI6IFwiTW9kZXJhdGVcIixcclxuLy8gICAgIFwiUHJlcmVxdWlzaXRlc1wiOiBcIkJhc2ljIFB5dGhvbiBrbm93bGVkZ2UgKHZhcmlhYmxlcywgZGF0YSB0eXBlcywgY29udHJvbCBmbG93LCBmdW5jdGlvbnMpLlwiXHJcbi8vICAgfSxcclxuLy8gICBcIkNoYXB0ZXJzXCI6IFtcclxuLy8gICAgIHtcclxuLy8gICAgICAgXCJDaGFwdGVyVGl0bGVcIjogXCJBZHZhbmNlZCBEYXRhIFN0cnVjdHVyZXNcIixcclxuLy8gICAgICAgXCJDaGFwdGVyU3VtbWFyeVwiOiBcIlRoaXMgY2hhcHRlciBkZWx2ZXMgaW50byBtb3JlIHNvcGhpc3RpY2F0ZWQgZGF0YSBzdHJ1Y3R1cmVzIGJleW9uZCBsaXN0cywgZGljdGlvbmFyaWVzLCBhbmQgdHVwbGVzLiBJdCBjb3ZlcnMgc2V0cywgY29tcHJlaGVuc2lvbnMsIGFuZCBleHBsb3JlcyB0aGUgc3RyZW5ndGhzIGFuZCB3ZWFrbmVzc2VzIG9mIGVhY2ggaW4gdmFyaW91cyB1c2UgY2FzZXMuXCIsXHJcbi8vICAgICAgIFwiVG9waWNzXCI6IFtcclxuLy8gICAgICAgICBcIlNldHMgYW5kIHRoZWlyIG9wZXJhdGlvbnMgKHVuaW9uLCBpbnRlcnNlY3Rpb24sIGRpZmZlcmVuY2UpXCIsXHJcbi8vICAgICAgICAgXCJMaXN0IGNvbXByZWhlbnNpb25zIGFuZCB0aGVpciBiZW5lZml0c1wiLFxyXG4vLyAgICAgICAgIFwiRGljdGlvbmFyeSBjb21wcmVoZW5zaW9uc1wiLFxyXG4vLyAgICAgICAgIFwiU2V0IGNvbXByZWhlbnNpb25zXCIsXHJcbi8vICAgICAgICAgXCJDb21wYXJpc29uIG9mIGRhdGEgc3RydWN0dXJlIHBlcmZvcm1hbmNlXCJcclxuLy8gICAgICAgXVxyXG4vLyAgICAgfSxcclxuLy8gICAgIHtcclxuLy8gICAgICAgXCJDaGFwdGVyVGl0bGVcIjogXCJPYmplY3QtT3JpZW50ZWQgUHJvZ3JhbW1pbmcgKE9PUCkgLSBQYXJ0IDFcIixcclxuLy8gICAgICAgXCJDaGFwdGVyU3VtbWFyeVwiOiBcIkFuIGludHJvZHVjdGlvbiB0byB0aGUgZnVuZGFtZW50YWxzIG9mIG9iamVjdC1vcmllbnRlZCBwcm9ncmFtbWluZy4gVGhpcyBjaGFwdGVyIGZvY3VzZXMgb24gY2xhc3Nlcywgb2JqZWN0cywgYW5kIGJhc2ljIE9PUCBjb25jZXB0cyBzdWNoIGFzIGVuY2Fwc3VsYXRpb24sIGluaGVyaXRhbmNlLCBhbmQgcG9seW1vcnBoaXNtLlwiLFxyXG4vLyAgICAgICBcIlRvcGljc1wiOiBbXHJcbi8vICAgICAgICAgXCJDbGFzc2VzIGFuZCBvYmplY3RzXCIsXHJcbi8vICAgICAgICAgXCJBdHRyaWJ1dGVzIGFuZCBtZXRob2RzXCIsXHJcbi8vICAgICAgICAgXCJFbmNhcHN1bGF0aW9uIChwdWJsaWMsIHByaXZhdGUsIHByb3RlY3RlZCBhdHRyaWJ1dGVzKVwiLFxyXG4vLyAgICAgICAgIFwiSW5oZXJpdGFuY2UgKHNpbmdsZSBhbmQgbXVsdGlwbGUpXCIsXHJcbi8vICAgICAgICAgXCJQb2x5bW9ycGhpc20gKG1ldGhvZCBvdmVycmlkaW5nKVwiXHJcbi8vICAgICAgIF1cclxuLy8gICAgIH0sXHJcbi8vICAgICB7XHJcbi8vICAgICAgIFwiQ2hhcHRlclRpdGxlXCI6IFwiT2JqZWN0LU9yaWVudGVkIFByb2dyYW1taW5nIChPT1ApIC0gUGFydCAyXCIsXHJcbi8vICAgICAgIFwiQ2hhcHRlclN1bW1hcnlcIjogXCJCdWlsZGluZyB1cG9uIHRoZSBPT1AgYmFzaWNzLCB0aGlzIGNoYXB0ZXIgZXhwbG9yZXMgbW9yZSBhZHZhbmNlZCBjb25jZXB0cyBsaWtlIGFic3RyYWN0IGNsYXNzZXMsIGludGVyZmFjZXMsIGFuZCBkZXNpZ24gcGF0dGVybnMsIGZ1cnRoZXIgaW1wcm92aW5nIGNvZGUgb3JnYW5pemF0aW9uIGFuZCByZXVzYWJpbGl0eS5cIixcclxuLy8gICAgICAgXCJUb3BpY3NcIjogW1xyXG4vLyAgICAgICAgIFwiQWJzdHJhY3QgY2xhc3NlcyBhbmQgbWV0aG9kc1wiLFxyXG4vLyAgICAgICAgIFwiSW50ZXJmYWNlcyAodXNpbmcgYWJzdHJhY3QgYmFzZSBjbGFzc2VzKVwiLFxyXG4vLyAgICAgICAgIFwiQ2xhc3MgbWV0aG9kcyBhbmQgc3RhdGljIG1ldGhvZHNcIixcclxuLy8gICAgICAgICBcIk1hZ2ljIG1ldGhvZHMgKGR1bmRlciBtZXRob2RzKVwiLFxyXG4vLyAgICAgICAgIFwiRGVzaWduIHBhdHRlcm5zIChicmllZiBpbnRyb2R1Y3Rpb24pXCJcclxuLy8gICAgICAgXVxyXG4vLyAgICAgfSxcclxuLy8gICAgIHtcclxuLy8gICAgICAgXCJDaGFwdGVyVGl0bGVcIjogXCJGaWxlIEhhbmRsaW5nXCIsXHJcbi8vICAgICAgIFwiQ2hhcHRlclN1bW1hcnlcIjogXCJMZWFybiBob3cgdG8gaW50ZXJhY3Qgd2l0aCBmaWxlcywgaW5jbHVkaW5nIHJlYWRpbmcgZnJvbSBhbmQgd3JpdGluZyB0byB0ZXh0IGFuZCBiaW5hcnkgZmlsZXMuIFRoaXMgaW5jbHVkZXMgZXJyb3IgaGFuZGxpbmcgd2hlbiB3b3JraW5nIHdpdGggZmlsZXMuXCIsXHJcbi8vICAgICAgIFwiVG9waWNzXCI6IFtcclxuLy8gICAgICAgICBcIk9wZW5pbmcgYW5kIGNsb3NpbmcgZmlsZXNcIixcclxuLy8gICAgICAgICBcIlJlYWRpbmcgYW5kIHdyaXRpbmcgdGV4dCBmaWxlc1wiLFxyXG4vLyAgICAgICAgIFwiUmVhZGluZyBhbmQgd3JpdGluZyBiaW5hcnkgZmlsZXNcIixcclxuLy8gICAgICAgICBcIkZpbGUgbW9kZXMgKHJlYWQsIHdyaXRlLCBhcHBlbmQpXCIsXHJcbi8vICAgICAgICAgXCJDb250ZXh0IG1hbmFnZXJzICh3aXRoIHN0YXRlbWVudClcIixcclxuLy8gICAgICAgICBcIkVycm9yIGhhbmRsaW5nIChlLmcuLCBGaWxlTm90Rm91bmRFcnJvcilcIlxyXG4vLyAgICAgICBdXHJcbi8vICAgICB9LFxyXG4vLyAgICAge1xyXG4vLyAgICAgICBcIkNoYXB0ZXJUaXRsZVwiOiBcIkVycm9yIEhhbmRsaW5nIGFuZCBFeGNlcHRpb24gSGFuZGxpbmdcIixcclxuLy8gICAgICAgXCJDaGFwdGVyU3VtbWFyeVwiOiBcIk1hc3RlciB0aGUgdGVjaG5pcXVlcyBmb3IgYW50aWNpcGF0aW5nIGFuZCBoYW5kbGluZyBlcnJvcnMgaW4gUHl0aG9uLiBUaGlzIGNoYXB0ZXIgaW50cm9kdWNlcyB0cnktZXhjZXB0IGJsb2NrcywgcmFpc2luZyBleGNlcHRpb25zLCBhbmQgY3JlYXRpbmcgY3VzdG9tIGV4Y2VwdGlvbiBjbGFzc2VzLlwiLFxyXG4vLyAgICAgICBcIlRvcGljc1wiOiBbXHJcbi8vICAgICAgICAgXCJUcnktZXhjZXB0IGJsb2Nrc1wiLFxyXG4vLyAgICAgICAgIFwiU3BlY2lmaWMgZXhjZXB0aW9uIHR5cGVzXCIsXHJcbi8vICAgICAgICAgXCJUaGUgZmluYWxseSBibG9ja1wiLFxyXG4vLyAgICAgICAgIFwiUmFpc2luZyBleGNlcHRpb25zIChyYWlzZSBrZXl3b3JkKVwiLFxyXG4vLyAgICAgICAgIFwiQ3JlYXRpbmcgY3VzdG9tIGV4Y2VwdGlvbiBjbGFzc2VzXCJcclxuLy8gICAgICAgXVxyXG4vLyAgICAgfSxcclxuLy8gICAgIHtcclxuLy8gICAgICAgXCJDaGFwdGVyVGl0bGVcIjogXCJNb2R1bGVzIGFuZCBQYWNrYWdlc1wiLFxyXG4vLyAgICAgICBcIkNoYXB0ZXJTdW1tYXJ5XCI6IFwiTGVhcm4gaG93IHRvIG9yZ2FuaXplIGNvZGUgaW50byByZXVzYWJsZSBtb2R1bGVzIGFuZCBwYWNrYWdlcy4gVGhpcyBjaGFwdGVyIGNvdmVycyBpbXBvcnRpbmcgbW9kdWxlcywgdXNpbmcgcGFja2FnZXMsIGFuZCBjcmVhdGluZyB5b3VyIG93biBtb2R1bGVzIGFuZCBwYWNrYWdlcy5cIixcclxuLy8gICAgICAgXCJUb3BpY3NcIjogW1xyXG4vLyAgICAgICAgIFwiSW1wb3J0aW5nIG1vZHVsZXMgKGltcG9ydCBzdGF0ZW1lbnRzKVwiLFxyXG4vLyAgICAgICAgIFwiSW1wb3J0aW5nIHNwZWNpZmljIGl0ZW1zIGZyb20gbW9kdWxlc1wiLFxyXG4vLyAgICAgICAgIFwiQ3JlYXRpbmcgYW5kIHVzaW5nIHBhY2thZ2VzXCIsXHJcbi8vICAgICAgICAgXCJUaGUgXFxgX19pbml0X18ucHlcXGAgZmlsZVwiLFxyXG4vLyAgICAgICAgIFwiUmVsYXRpdmUgYW5kIGFic29sdXRlIGltcG9ydHNcIlxyXG4vLyAgICAgICBdXHJcbi8vICAgICB9LFxyXG4vLyAgICAge1xyXG4vLyAgICAgICBcIkNoYXB0ZXJUaXRsZVwiOiBcIkludHJvZHVjdGlvbiB0byBSZWd1bGFyIEV4cHJlc3Npb25zXCIsXHJcbi8vICAgICAgIFwiQ2hhcHRlclN1bW1hcnlcIjogXCJUaGlzIGNoYXB0ZXIgcHJvdmlkZXMgYW4gaW50cm9kdWN0aW9uIHRvIHJlZ3VsYXIgZXhwcmVzc2lvbnMgKHJlZ2V4KSBhbmQgdGhlaXIgdXNlIGluIHBhdHRlcm4gbWF0Y2hpbmcgd2l0aGluIHN0cmluZ3MuIFwiLFxyXG4vLyAgICAgICBcIlRvcGljc1wiOiBbXHJcbi8vICAgICAgICAgICBcIkJhc2ljIFJlZ2V4IFN5bnRheFwiLFxyXG4vLyAgICAgICAgICAgXCJNYXRjaGluZyBwYXR0ZXJucyB3aXRoIHJlIG1vZHVsZVwiLFxyXG4vLyAgICAgICAgICAgXCJDaGFyYWN0ZXIgY2xhc3Nlc1wiLFxyXG4vLyAgICAgICAgICAgXCJRdWFudGlmaWVyc1wiLFxyXG4vLyAgICAgICAgICAgXCJHcm91cGluZyBhbmQgY2FwdHVyaW5nXCJcclxuLy8gICAgICAgXVxyXG4vLyAgICAgfVxyXG4vLyAgIF1cclxuLy8gfVxyXG4vLyBcXGBcXGBcXGBgLFxyXG4vLyAgICAgICB9LFxyXG4vLyAgICAgXSxcclxuLy8gICB9LFxyXG4vLyBdO1xyXG5cclxuLy8gICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFpLm1vZGVscy5nZW5lcmF0ZUNvbnRlbnRTdHJlYW0oe1xyXG4vLyAgICAgbW9kZWwsXHJcbi8vICAgICBjb25maWcsXHJcbi8vICAgICBjb250ZW50cyxcclxuLy8gICB9KTtcclxuLy8gICBsZXQgZmlsZUluZGV4ID0gMDtcclxuLy8gICBmb3IgYXdhaXQgKGNvbnN0IGNodW5rIG9mIHJlc3BvbnNlKSB7XHJcbi8vICAgICBjb25zb2xlLmxvZyhjaHVuay50ZXh0KTtcclxuLy8gICB9XHJcbi8vIH1cclxuXHJcbmltcG9ydCB7IEdvb2dsZUdlbkFJIH0gZnJvbSBcIkBnb29nbGUvZ2VuYWlcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBnZW5BSSA9IG5ldyBHb29nbGVHZW5BSSh7XHJcbiAgYXBpS2V5OiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19HRU1JTklfQVBJX0tFWSxcclxufSk7XHJcblxyXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVOb3Rlc0FJTW9kZWwgPSBuZXcgR29vZ2xlR2VuQUkoe1xyXG4gIGFwaUtleTogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfR0VNSU5JX0FQSV9LRVksXHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlU3R1ZHlUeXBlQ29udGVudEFpTW9kZWwgPSBuZXcgR29vZ2xlR2VuQUkoe1xyXG4gIGFwaUtleTogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfR0VNSU5JX0FQSV9LRVksXHJcbn0pO1xyXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVRdWl6QUlNb2RlbD0gbmV3IEdvb2dsZUdlbkFJKHtcclxuICBhcGlLZXk6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0dFTUlOSV9BUElfS0VZLFxyXG59KTtcclxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlUUFBSU1vZGVsID0gbmV3IEdvb2dsZUdlbkFJKHtcclxuICBhcGlLZXk6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0dFTUlOSV9BUElfS0VZLFxyXG59KTtcclxuIl0sIm5hbWVzIjpbIkdvb2dsZUdlbkFJIiwiZ2VuQUkiLCJhcGlLZXkiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfR0VNSU5JX0FQSV9LRVkiLCJnZW5lcmF0ZU5vdGVzQUlNb2RlbCIsImdlbmVyYXRlU3R1ZHlUeXBlQ29udGVudEFpTW9kZWwiLCJnZW5lcmF0ZVF1aXpBSU1vZGVsIiwiZ2VuZXJhdGVRQUFJTW9kZWwiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./configs/AiModel.js\n");

/***/ }),

/***/ "(rsc)/./configs/db.js":
/*!***********************!*\
  !*** ./configs/db.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var drizzle_orm_neon_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! drizzle-orm/neon-http */ \"(rsc)/./node_modules/drizzle-orm/neon-http/driver.js\");\n\nconst db = (0,drizzle_orm_neon_http__WEBPACK_IMPORTED_MODULE_0__.drizzle)(\"postgresql://Prep-AI-Smart-Study-Material_owner:npg_5feuEw7bZcHU@ep-tight-rain-a1p8nyrb-pooler.ap-southeast-1.aws.neon.tech/Prep-AI-Smart-Study-Material?sslmode=require\");\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (db);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9jb25maWdzL2RiLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQWdEO0FBRWhELE1BQU1DLEtBQUtELDhEQUFPQSxDQUFDRSwwS0FBa0Q7QUFFckUsaUVBQWVELEVBQUVBLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcVmluYXlha1xcRGVza3RvcFxcRnVsbF9TdGFja19Qcm9qZWN0c1xccHJlcC1haVxcY29uZmlnc1xcZGIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZHJpenpsZSB9IGZyb20gXCJkcml6emxlLW9ybS9uZW9uLWh0dHBcIjtcclxuXHJcbmNvbnN0IGRiID0gZHJpenpsZShwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19EQVRBQkFTRV9DT05ORUNUSU9OX1NUUklORyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkYjtcclxuIl0sIm5hbWVzIjpbImRyaXp6bGUiLCJkYiIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19EQVRBQkFTRV9DT05ORUNUSU9OX1NUUklORyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./configs/db.js\n");

/***/ }),

/***/ "(rsc)/./configs/schema.js":
/*!***************************!*\
  !*** ./configs/schema.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CHAPTER_NOTES_TABLE: () => (/* binding */ CHAPTER_NOTES_TABLE),\n/* harmony export */   STUDY_MATERIAL_TABLE: () => (/* binding */ STUDY_MATERIAL_TABLE),\n/* harmony export */   STUDY_TYPE_CONTENT_TABLE: () => (/* binding */ STUDY_TYPE_CONTENT_TABLE),\n/* harmony export */   USER_TABLE: () => (/* binding */ USER_TABLE)\n/* harmony export */ });\n/* harmony import */ var drizzle_orm_gel_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! drizzle-orm/gel-core */ \"(rsc)/./node_modules/drizzle-orm/gel-core/columns/integer.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/table.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/columns/serial.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/columns/varchar.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/columns/boolean.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/columns/json.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/columns/text.js\");\n\n\nconst USER_TABLE = (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_0__.pgTable)(\"users\", {\n    id: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.serial)().primaryKey(),\n    name: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)().notNull(),\n    email: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)().notNull(),\n    isMember: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_3__.boolean)().notNull().default(false)\n});\nconst STUDY_MATERIAL_TABLE = (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_0__.pgTable)(\"studymaterial\", {\n    id: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.serial)().primaryKey(),\n    courseId: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)().notNull(),\n    courseType: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)().notNull(),\n    topic: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)().notNull(),\n    difficultyLevel: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)().default(\"Easy\"),\n    courseLayout: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_4__.json)().$default(\"Nothing\"),\n    createdBy: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)().notNull(),\n    status: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)().default(\"Generating\")\n});\nconst CHAPTER_NOTES_TABLE = (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_0__.pgTable)(\"chapterNotes\", {\n    id: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.serial)().primaryKey(),\n    courseId: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)().notNull(),\n    chapterId: (0,drizzle_orm_gel_core__WEBPACK_IMPORTED_MODULE_5__.integer)().notNull(),\n    notes: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_6__.text)()\n});\nconst STUDY_TYPE_CONTENT_TABLE = (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_0__.pgTable)(\"studyTypeContent\", {\n    id: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.serial)().primaryKey(),\n    courseId: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)().notNull(),\n    content: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_4__.json)(),\n    type: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)().notNull(),\n    status: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)().default(\"Generating\")\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9jb25maWdzL3NjaGVtYS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErQztBQVFsQjtBQUV0QixNQUFNTyxhQUFhTiw0REFBT0EsQ0FBQyxTQUFTO0lBQ3pDTyxJQUFJSiwyREFBTUEsR0FBR0ssVUFBVTtJQUN2QkMsTUFBTVIsNERBQU9BLEdBQUdTLE9BQU87SUFDdkJDLE9BQU9WLDREQUFPQSxHQUFHUyxPQUFPO0lBQ3hCRSxVQUFVViw0REFBT0EsR0FBR1EsT0FBTyxHQUFHRyxPQUFPLENBQUM7QUFDeEMsR0FBRztBQUNJLE1BQU1DLHVCQUF1QmQsNERBQU9BLENBQUMsaUJBQWlCO0lBQzNETyxJQUFJSiwyREFBTUEsR0FBR0ssVUFBVTtJQUN2Qk8sVUFBVWQsNERBQU9BLEdBQUdTLE9BQU87SUFDM0JNLFlBQVlmLDREQUFPQSxHQUFHUyxPQUFPO0lBQzdCTyxPQUFPaEIsNERBQU9BLEdBQUdTLE9BQU87SUFDeEJRLGlCQUFpQmpCLDREQUFPQSxHQUFHWSxPQUFPLENBQUM7SUFDbkNNLGNBQWNmLHlEQUFJQSxHQUFHZ0IsUUFBUSxDQUFDO0lBQzlCQyxXQUFXcEIsNERBQU9BLEdBQUdTLE9BQU87SUFDNUJZLFFBQVFyQiw0REFBT0EsR0FBR1ksT0FBTyxDQUFDO0FBQzVCLEdBQUc7QUFFSSxNQUFNVSxzQkFBc0J2Qiw0REFBT0EsQ0FBQyxnQkFBZ0I7SUFDekRPLElBQUlKLDJEQUFNQSxHQUFHSyxVQUFVO0lBQ3ZCTyxVQUFVZCw0REFBT0EsR0FBR1MsT0FBTztJQUMzQmMsV0FBV3pCLDZEQUFPQSxHQUFHVyxPQUFPO0lBQzVCZSxPQUFPcEIseURBQUlBO0FBQ2IsR0FBRztBQUVJLE1BQU1xQiwyQkFBMkIxQiw0REFBT0EsQ0FBQyxvQkFBb0I7SUFDbEVPLElBQUlKLDJEQUFNQSxHQUFHSyxVQUFVO0lBQ3ZCTyxVQUFVZCw0REFBT0EsR0FBR1MsT0FBTztJQUMzQmlCLFNBQVN2Qix5REFBSUE7SUFDYndCLE1BQU0zQiw0REFBT0EsR0FBR1MsT0FBTztJQUN2QlksUUFBUXJCLDREQUFPQSxHQUFHWSxPQUFPLENBQUM7QUFDNUIsR0FBRyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxWaW5heWFrXFxEZXNrdG9wXFxGdWxsX1N0YWNrX1Byb2plY3RzXFxwcmVwLWFpXFxjb25maWdzXFxzY2hlbWEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW50ZWdlciB9IGZyb20gXCJkcml6emxlLW9ybS9nZWwtY29yZVwiO1xyXG5pbXBvcnQge1xyXG4gIHBnVGFibGUsXHJcbiAgdmFyY2hhcixcclxuICBib29sZWFuLFxyXG4gIHNlcmlhbCxcclxuICBqc29uLFxyXG4gIHRleHQsXHJcbn0gZnJvbSBcImRyaXp6bGUtb3JtL3BnLWNvcmVcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBVU0VSX1RBQkxFID0gcGdUYWJsZShcInVzZXJzXCIsIHtcclxuICBpZDogc2VyaWFsKCkucHJpbWFyeUtleSgpLFxyXG4gIG5hbWU6IHZhcmNoYXIoKS5ub3ROdWxsKCksXHJcbiAgZW1haWw6IHZhcmNoYXIoKS5ub3ROdWxsKCksXHJcbiAgaXNNZW1iZXI6IGJvb2xlYW4oKS5ub3ROdWxsKCkuZGVmYXVsdChmYWxzZSksXHJcbn0pO1xyXG5leHBvcnQgY29uc3QgU1RVRFlfTUFURVJJQUxfVEFCTEUgPSBwZ1RhYmxlKFwic3R1ZHltYXRlcmlhbFwiLCB7XHJcbiAgaWQ6IHNlcmlhbCgpLnByaW1hcnlLZXkoKSxcclxuICBjb3Vyc2VJZDogdmFyY2hhcigpLm5vdE51bGwoKSxcclxuICBjb3Vyc2VUeXBlOiB2YXJjaGFyKCkubm90TnVsbCgpLFxyXG4gIHRvcGljOiB2YXJjaGFyKCkubm90TnVsbCgpLFxyXG4gIGRpZmZpY3VsdHlMZXZlbDogdmFyY2hhcigpLmRlZmF1bHQoXCJFYXN5XCIpLFxyXG4gIGNvdXJzZUxheW91dDoganNvbigpLiRkZWZhdWx0KFwiTm90aGluZ1wiKSxcclxuICBjcmVhdGVkQnk6IHZhcmNoYXIoKS5ub3ROdWxsKCksXHJcbiAgc3RhdHVzOiB2YXJjaGFyKCkuZGVmYXVsdChcIkdlbmVyYXRpbmdcIiksXHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IENIQVBURVJfTk9URVNfVEFCTEUgPSBwZ1RhYmxlKFwiY2hhcHRlck5vdGVzXCIsIHtcclxuICBpZDogc2VyaWFsKCkucHJpbWFyeUtleSgpLFxyXG4gIGNvdXJzZUlkOiB2YXJjaGFyKCkubm90TnVsbCgpLFxyXG4gIGNoYXB0ZXJJZDogaW50ZWdlcigpLm5vdE51bGwoKSxcclxuICBub3RlczogdGV4dCgpLFxyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCBTVFVEWV9UWVBFX0NPTlRFTlRfVEFCTEUgPSBwZ1RhYmxlKFwic3R1ZHlUeXBlQ29udGVudFwiLCB7XHJcbiAgaWQ6IHNlcmlhbCgpLnByaW1hcnlLZXkoKSxcclxuICBjb3Vyc2VJZDogdmFyY2hhcigpLm5vdE51bGwoKSxcclxuICBjb250ZW50OiBqc29uKCksXHJcbiAgdHlwZTogdmFyY2hhcigpLm5vdE51bGwoKSxcclxuICBzdGF0dXM6IHZhcmNoYXIoKS5kZWZhdWx0KFwiR2VuZXJhdGluZ1wiKSxcclxufSk7XHJcbiJdLCJuYW1lcyI6WyJpbnRlZ2VyIiwicGdUYWJsZSIsInZhcmNoYXIiLCJib29sZWFuIiwic2VyaWFsIiwianNvbiIsInRleHQiLCJVU0VSX1RBQkxFIiwiaWQiLCJwcmltYXJ5S2V5IiwibmFtZSIsIm5vdE51bGwiLCJlbWFpbCIsImlzTWVtYmVyIiwiZGVmYXVsdCIsIlNUVURZX01BVEVSSUFMX1RBQkxFIiwiY291cnNlSWQiLCJjb3Vyc2VUeXBlIiwidG9waWMiLCJkaWZmaWN1bHR5TGV2ZWwiLCJjb3Vyc2VMYXlvdXQiLCIkZGVmYXVsdCIsImNyZWF0ZWRCeSIsInN0YXR1cyIsIkNIQVBURVJfTk9URVNfVEFCTEUiLCJjaGFwdGVySWQiLCJub3RlcyIsIlNUVURZX1RZUEVfQ09OVEVOVF9UQUJMRSIsImNvbnRlbnQiLCJ0eXBlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./configs/schema.js\n");

/***/ }),

/***/ "(rsc)/./inngest/client.js":
/*!***************************!*\
  !*** ./inngest/client.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   inngest: () => (/* binding */ inngest)\n/* harmony export */ });\n/* harmony import */ var inngest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inngest */ \"(rsc)/./node_modules/inngest/index.js\");\n/* harmony import */ var inngest__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inngest__WEBPACK_IMPORTED_MODULE_0__);\n\n// Create a client to send and receive events\nconst inngest = new inngest__WEBPACK_IMPORTED_MODULE_0__.Inngest({\n    id: \"prepAI\",\n    eventKey: \"pqEjIXTRCBm6Xvh6IRW0SOSLN0oBPdShtxSm4tHBGoggFjlREzXY89BkJM9NGf7VBDGtwsCzoP6qEBL_F7K8_Q\",\n    signingKey: \"signkey-prod-07c3c54f5880c5b170cf2985e5ca7736151509931490b81b6646abef4c1adbe3\"\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9pbm5nZXN0L2NsaWVudC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBa0M7QUFFbEMsNkNBQTZDO0FBQ3RDLE1BQU1DLFVBQVUsSUFBSUQsNENBQU9BLENBQUM7SUFDakNFLElBQUk7SUFDSkMsVUFBVUMsd0ZBQXlDO0lBQ25ERyxZQUFZSCwrRUFBMkM7QUFDekQsR0FBRyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxWaW5heWFrXFxEZXNrdG9wXFxGdWxsX1N0YWNrX1Byb2plY3RzXFxwcmVwLWFpXFxpbm5nZXN0XFxjbGllbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5uZ2VzdCB9IGZyb20gXCJpbm5nZXN0XCI7XHJcblxyXG4vLyBDcmVhdGUgYSBjbGllbnQgdG8gc2VuZCBhbmQgcmVjZWl2ZSBldmVudHNcclxuZXhwb3J0IGNvbnN0IGlubmdlc3QgPSBuZXcgSW5uZ2VzdCh7XHJcbiAgaWQ6IFwicHJlcEFJXCIsXHJcbiAgZXZlbnRLZXk6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0lOTkdFU1RfRVZFTlRfS0VZLFxyXG4gIHNpZ25pbmdLZXk6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0lOTkdFU1RfU0lHTklOR19LRVksXHJcbn0pO1xyXG4iXSwibmFtZXMiOlsiSW5uZ2VzdCIsImlubmdlc3QiLCJpZCIsImV2ZW50S2V5IiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0lOTkdFU1RfRVZFTlRfS0VZIiwic2lnbmluZ0tleSIsIk5FWFRfUFVCTElDX0lOTkdFU1RfU0lHTklOR19LRVkiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./inngest/client.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgenerate-course-outline%2Froute&page=%2Fapi%2Fgenerate-course-outline%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgenerate-course-outline%2Froute.js&appDir=C%3A%5CUsers%5CVinayak%5CDesktop%5CFull_Stack_Projects%5Cprep-ai%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CVinayak%5CDesktop%5CFull_Stack_Projects%5Cprep-ai&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgenerate-course-outline%2Froute&page=%2Fapi%2Fgenerate-course-outline%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgenerate-course-outline%2Froute.js&appDir=C%3A%5CUsers%5CVinayak%5CDesktop%5CFull_Stack_Projects%5Cprep-ai%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CVinayak%5CDesktop%5CFull_Stack_Projects%5Cprep-ai&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Vinayak_Desktop_Full_Stack_Projects_prep_ai_app_api_generate_course_outline_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/generate-course-outline/route.js */ \"(rsc)/./app/api/generate-course-outline/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/generate-course-outline/route\",\n        pathname: \"/api/generate-course-outline\",\n        filename: \"route\",\n        bundlePath: \"app/api/generate-course-outline/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Vinayak\\\\Desktop\\\\Full_Stack_Projects\\\\prep-ai\\\\app\\\\api\\\\generate-course-outline\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_Vinayak_Desktop_Full_Stack_Projects_prep_ai_app_api_generate_course_outline_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZnZW5lcmF0ZS1jb3Vyc2Utb3V0bGluZSUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGZ2VuZXJhdGUtY291cnNlLW91dGxpbmUlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZnZW5lcmF0ZS1jb3Vyc2Utb3V0bGluZSUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNWaW5heWFrJTVDRGVza3RvcCU1Q0Z1bGxfU3RhY2tfUHJvamVjdHMlNUNwcmVwLWFpJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNWaW5heWFrJTVDRGVza3RvcCU1Q0Z1bGxfU3RhY2tfUHJvamVjdHMlNUNwcmVwLWFpJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNzRDtBQUNuSTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcVmluYXlha1xcXFxEZXNrdG9wXFxcXEZ1bGxfU3RhY2tfUHJvamVjdHNcXFxccHJlcC1haVxcXFxhcHBcXFxcYXBpXFxcXGdlbmVyYXRlLWNvdXJzZS1vdXRsaW5lXFxcXHJvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9nZW5lcmF0ZS1jb3Vyc2Utb3V0bGluZS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2dlbmVyYXRlLWNvdXJzZS1vdXRsaW5lXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9nZW5lcmF0ZS1jb3Vyc2Utb3V0bGluZS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXFZpbmF5YWtcXFxcRGVza3RvcFxcXFxGdWxsX1N0YWNrX1Byb2plY3RzXFxcXHByZXAtYWlcXFxcYXBwXFxcXGFwaVxcXFxnZW5lcmF0ZS1jb3Vyc2Utb3V0bGluZVxcXFxyb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgenerate-course-outline%2Froute&page=%2Fapi%2Fgenerate-course-outline%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgenerate-course-outline%2Froute.js&appDir=C%3A%5CUsers%5CVinayak%5CDesktop%5CFull_Stack_Projects%5Cprep-ai%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CVinayak%5CDesktop%5CFull_Stack_Projects%5Cprep-ai&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "?32c4":
/*!****************************!*\
  !*** bufferutil (ignored) ***!
  \****************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?66e9":
/*!********************************!*\
  !*** utf-8-validate (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "fs/promises":
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("fs/promises");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "node:async_hooks":
/*!***********************************!*\
  !*** external "node:async_hooks" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:async_hooks");

/***/ }),

/***/ "node:events":
/*!******************************!*\
  !*** external "node:events" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:events");

/***/ }),

/***/ "node:process":
/*!*******************************!*\
  !*** external "node:process" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:process");

/***/ }),

/***/ "node:stream":
/*!******************************!*\
  !*** external "node:stream" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:util");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@opentelemetry","vendor-chunks/drizzle-orm","vendor-chunks/@neondatabase","vendor-chunks/debug","vendor-chunks/ms","vendor-chunks/supports-color","vendor-chunks/has-flag","vendor-chunks/inngest","vendor-chunks/tr46","vendor-chunks/zod","vendor-chunks/node-fetch","vendor-chunks/whatwg-url","vendor-chunks/hash.js","vendor-chunks/color-convert","vendor-chunks/chalk","vendor-chunks/@inngest","vendor-chunks/webidl-conversions","vendor-chunks/color-name","vendor-chunks/serialize-error-cjs","vendor-chunks/inherits","vendor-chunks/json-stringify-safe","vendor-chunks/canonicalize","vendor-chunks/cross-fetch","vendor-chunks/minimalistic-assert","vendor-chunks/@google","vendor-chunks/google-auth-library","vendor-chunks/ws","vendor-chunks/bignumber.js","vendor-chunks/gaxios","vendor-chunks/json-bigint","vendor-chunks/google-logging-utils","vendor-chunks/gcp-metadata","vendor-chunks/https-proxy-agent","vendor-chunks/gtoken","vendor-chunks/uuid","vendor-chunks/agent-base","vendor-chunks/jws","vendor-chunks/jwa","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/base64-js","vendor-chunks/extend","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time","vendor-chunks/is-stream"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgenerate-course-outline%2Froute&page=%2Fapi%2Fgenerate-course-outline%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgenerate-course-outline%2Froute.js&appDir=C%3A%5CUsers%5CVinayak%5CDesktop%5CFull_Stack_Projects%5Cprep-ai%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CVinayak%5CDesktop%5CFull_Stack_Projects%5Cprep-ai&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();