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
exports.id = "app/api/generate-study-type-content/route";
exports.ids = ["app/api/generate-study-type-content/route"];
exports.modules = {

/***/ "(rsc)/./app/api/generate-study-type-content/route.js":
/*!******************************************************!*\
  !*** ./app/api/generate-study-type-content/route.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   dynamic: () => (/* binding */ dynamic),\n/* harmony export */   revalidate: () => (/* binding */ revalidate)\n/* harmony export */ });\n/* harmony import */ var _configs_schema__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/configs/schema */ \"(rsc)/./configs/schema.js\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _configs_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/configs/db */ \"(rsc)/./configs/db.js\");\n/* harmony import */ var _inngest_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/inngest/client */ \"(rsc)/./inngest/client.js\");\n\n\n\n\nconst revalidate = 0;\nconst dynamic = \"force-dynamic\";\nasync function POST(req) {\n    try {\n        const { chapters, courseId, type } = await req.json();\n        let PROMPT;\n        if (type === \"flashCard\") {\n            PROMPT = `\nYou are an expert educational content generator.  \nGenerate high-quality flashcards for the given topic in valid JSON format only.\n\nRules:\n- Create a maximum of 15 flashcards.\n- Each flashcard must have:\n  front: a clear question, keyword, or concept name.\n  back: a detailed, student-friendly explanation for the front. Include examples for deep understanding.\n- Use simple, clear language suitable for learners.\n- Cover a range of key points and subtopics relevant to the given chapters.\n- Format the output as a valid JSON object named \"flashcards\", which contains an array of objects with \"front\" and \"back\" keys.\n- Do not add any extra text, instructions, or commentary outside the JSON. Return only raw JSON.\n\nNow, generate the flashcards for the following chapters: ${chapters}\n`;\n        } else if (type === \"quiz\") {\n            PROMPT = `\nYou are an expert educational content generator.  \nGenerate a high-quality quiz with options and the correct answer for the given topic in valid JSON format only.\n\nEach question must have:\n- A clear question text.\n- Four answer options labeled A, B, C, and D.\n- The correct answer specified as the option letter.\n\nProvide the output in valid JSON format with the following structure:\n\n{\n  \"topic\": \"<TOPIC_NAME>\",\n  \"questions\": [\n    {\n      \"question\": \"<Question text>\",\n      \"options\": {\n        \"A\": \"<Option A text>\",\n        \"B\": \"<Option B text>\",\n        \"C\": \"<Option C text>\",\n        \"D\": \"<Option D text>\"\n      },\n      \"correct_answer\": \"A\"  // Use the option letter only\n    },\n    ...\n  ]\n}\n\nGenerate at least 15 questions.\n\nExample:\n{\n  \"topic\": \"Photosynthesis\",\n  \"questions\": [\n    {\n      \"question\": \"Which gas is absorbed during photosynthesis?\",\n      \"options\": {\n        \"A\": \"Carbon Dioxide\",\n        \"B\": \"Oxygen\",\n        \"C\": \"Nitrogen\",\n        \"D\": \"Hydrogen\"\n      },\n      \"correct_answer\": \"A\"\n    },\n    ...\n  ]\n}\n  \nNow generate the quiz on: ${chapters}\n`;\n        } else {\n            PROMPT = `\n  \n  \"text\": \"Generate multiple conceptual question-and-answer pairs based on the following chapters----\n   For each chapter, generate at least 7-10  question-answer pairs. The output should be in valid JSON format only, structured as an array of objects. Each object must contain two fields: \\\"question\\\" and \\\"answer\\\". The \\\"question\\\" field should contain the question in an <h2> HTML tag. The \\\"answer\\\" field should contain a detailed explanation in HTML using tags like <p>, <ul>, <li>, <b>, <i>, <code>, and <pre>. Do not include any markdown syntax, triple backticks, or non-JSON text. Return only a clean JSON array without any comments or extra explanation.\"\n\n   Format of the question and Answers ->\n   - Question must be in h2 and in bold with margin from top and bottom.\n   - Answer include different types of thr rich content and contain the bold subheadings and margin padding tables container wherver required with the suitable examples..!\n\n        \n  Now  Generate a question and its detailed answer on the topic: ${chapters}\n        \n        \n        `;\n        }\n        const result = await _configs_db__WEBPACK_IMPORTED_MODULE_2__[\"default\"].insert(_configs_schema__WEBPACK_IMPORTED_MODULE_0__.STUDY_TYPE_CONTENT_TABLE).values({\n            courseId: courseId,\n            type: type\n        }).returning({\n            id: _configs_schema__WEBPACK_IMPORTED_MODULE_0__.STUDY_TYPE_CONTENT_TABLE.id\n        });\n        console.log(\"🧠 Sending Inngest event:\", {\n            name: \"studyType.content\",\n            data: {\n                studyType: type,\n                prompt: PROMPT,\n                courseId: courseId\n            }\n        });\n        await _inngest_client__WEBPACK_IMPORTED_MODULE_3__.inngest.send({\n            name: \"studyType.content\",\n            data: {\n                studyType: type,\n                prompt: PROMPT,\n                courseId: courseId\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json(result[0]);\n    } catch (error) {\n        console.error(\"Error in study-type-content API:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: \"Internal Server Error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2dlbmVyYXRlLXN0dWR5LXR5cGUtY29udGVudC9yb3V0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQTREO0FBQ2pCO0FBQ2I7QUFDYTtBQUNwQyxNQUFNSSxhQUFhLEVBQUM7QUFDcEIsTUFBTUMsVUFBVSxnQkFBZ0I7QUFFaEMsZUFBZUMsS0FBS0MsR0FBRztJQUM1QixJQUFJO1FBQ0YsTUFBTSxFQUFFQyxRQUFRLEVBQUVDLFFBQVEsRUFBRUMsSUFBSSxFQUFFLEdBQUcsTUFBTUgsSUFBSUksSUFBSTtRQUNuRCxJQUFJQztRQUNKLElBQUlGLFNBQVMsYUFBYTtZQUN4QkUsU0FBUyxDQUFDOzs7Ozs7Ozs7Ozs7Ozt5REFjeUMsRUFBRUosU0FBUztBQUNwRSxDQUFDO1FBQ0csT0FBTyxJQUFJRSxTQUFTLFFBQVE7WUFDMUJFLFNBQVMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQWdEVSxFQUFFSixTQUFTO0FBQ3JDLENBQUM7UUFDRyxPQUFPO1lBQ0xJLFNBQVMsQ0FBQzs7Ozs7Ozs7OztpRUFVaUQsRUFBRUosU0FBUzs7O1FBR3BFLENBQUM7UUFDTDtRQUVBLE1BQU1LLFNBQVMsTUFBTVgsbURBQUVBLENBQ3BCWSxNQUFNLENBQUNkLHFFQUF3QkEsRUFDL0JlLE1BQU0sQ0FBQztZQUNOTixVQUFVQTtZQUNWQyxNQUFNQTtRQUNSLEdBQ0NNLFNBQVMsQ0FBQztZQUNUQyxJQUFJakIscUVBQXdCQSxDQUFDaUIsRUFBRTtRQUNqQztRQUVGQyxRQUFRQyxHQUFHLENBQUMsNkJBQTZCO1lBQ3ZDQyxNQUFNO1lBQ05DLE1BQU07Z0JBQ0pDLFdBQVdaO2dCQUNYYSxRQUFRWDtnQkFDUkgsVUFBVUE7WUFDWjtRQUNGO1FBRUEsTUFBTU4sb0RBQU9BLENBQUNxQixJQUFJLENBQUM7WUFDakJKLE1BQU07WUFDTkMsTUFBTTtnQkFDSkMsV0FBV1o7Z0JBQ1hhLFFBQVFYO2dCQUNSSCxVQUFVQTtZQUNaO1FBQ0Y7UUFFQSxPQUFPUixxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDRSxNQUFNLENBQUMsRUFBRTtJQUNwQyxFQUFFLE9BQU9ZLE9BQU87UUFDZFAsUUFBUU8sS0FBSyxDQUFDLG9DQUFvQ0E7UUFDbEQsT0FBT3hCLHFEQUFZQSxDQUFDVSxJQUFJLENBQ3RCO1lBQUVjLE9BQU87UUFBd0IsR0FDakM7WUFBRUMsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcVmluYXlha1xcRGVza3RvcFxcRnVsbF9TdGFja19Qcm9qZWN0c1xccHJlcC1haVxcYXBwXFxhcGlcXGdlbmVyYXRlLXN0dWR5LXR5cGUtY29udGVudFxccm91dGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU1RVRFlfVFlQRV9DT05URU5UX1RBQkxFIH0gZnJvbSBcIkAvY29uZmlncy9zY2hlbWFcIjtcclxuaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcbmltcG9ydCBkYiBmcm9tIFwiQC9jb25maWdzL2RiXCI7XHJcbmltcG9ydCB7IGlubmdlc3QgfSBmcm9tIFwiQC9pbm5nZXN0L2NsaWVudFwiO1xyXG5leHBvcnQgY29uc3QgcmV2YWxpZGF0ZSA9IDBcclxuZXhwb3J0IGNvbnN0IGR5bmFtaWMgPSBcImZvcmNlLWR5bmFtaWNcIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcSkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB7IGNoYXB0ZXJzLCBjb3Vyc2VJZCwgdHlwZSB9ID0gYXdhaXQgcmVxLmpzb24oKTtcclxuICAgIGxldCBQUk9NUFQ7XHJcbiAgICBpZiAodHlwZSA9PT0gXCJmbGFzaENhcmRcIikge1xyXG4gICAgICBQUk9NUFQgPSBgXHJcbllvdSBhcmUgYW4gZXhwZXJ0IGVkdWNhdGlvbmFsIGNvbnRlbnQgZ2VuZXJhdG9yLiAgXHJcbkdlbmVyYXRlIGhpZ2gtcXVhbGl0eSBmbGFzaGNhcmRzIGZvciB0aGUgZ2l2ZW4gdG9waWMgaW4gdmFsaWQgSlNPTiBmb3JtYXQgb25seS5cclxuXHJcblJ1bGVzOlxyXG4tIENyZWF0ZSBhIG1heGltdW0gb2YgMTUgZmxhc2hjYXJkcy5cclxuLSBFYWNoIGZsYXNoY2FyZCBtdXN0IGhhdmU6XHJcbiAgZnJvbnQ6IGEgY2xlYXIgcXVlc3Rpb24sIGtleXdvcmQsIG9yIGNvbmNlcHQgbmFtZS5cclxuICBiYWNrOiBhIGRldGFpbGVkLCBzdHVkZW50LWZyaWVuZGx5IGV4cGxhbmF0aW9uIGZvciB0aGUgZnJvbnQuIEluY2x1ZGUgZXhhbXBsZXMgZm9yIGRlZXAgdW5kZXJzdGFuZGluZy5cclxuLSBVc2Ugc2ltcGxlLCBjbGVhciBsYW5ndWFnZSBzdWl0YWJsZSBmb3IgbGVhcm5lcnMuXHJcbi0gQ292ZXIgYSByYW5nZSBvZiBrZXkgcG9pbnRzIGFuZCBzdWJ0b3BpY3MgcmVsZXZhbnQgdG8gdGhlIGdpdmVuIGNoYXB0ZXJzLlxyXG4tIEZvcm1hdCB0aGUgb3V0cHV0IGFzIGEgdmFsaWQgSlNPTiBvYmplY3QgbmFtZWQgXCJmbGFzaGNhcmRzXCIsIHdoaWNoIGNvbnRhaW5zIGFuIGFycmF5IG9mIG9iamVjdHMgd2l0aCBcImZyb250XCIgYW5kIFwiYmFja1wiIGtleXMuXHJcbi0gRG8gbm90IGFkZCBhbnkgZXh0cmEgdGV4dCwgaW5zdHJ1Y3Rpb25zLCBvciBjb21tZW50YXJ5IG91dHNpZGUgdGhlIEpTT04uIFJldHVybiBvbmx5IHJhdyBKU09OLlxyXG5cclxuTm93LCBnZW5lcmF0ZSB0aGUgZmxhc2hjYXJkcyBmb3IgdGhlIGZvbGxvd2luZyBjaGFwdGVyczogJHtjaGFwdGVyc31cclxuYDtcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJxdWl6XCIpIHtcclxuICAgICAgUFJPTVBUID0gYFxyXG5Zb3UgYXJlIGFuIGV4cGVydCBlZHVjYXRpb25hbCBjb250ZW50IGdlbmVyYXRvci4gIFxyXG5HZW5lcmF0ZSBhIGhpZ2gtcXVhbGl0eSBxdWl6IHdpdGggb3B0aW9ucyBhbmQgdGhlIGNvcnJlY3QgYW5zd2VyIGZvciB0aGUgZ2l2ZW4gdG9waWMgaW4gdmFsaWQgSlNPTiBmb3JtYXQgb25seS5cclxuXHJcbkVhY2ggcXVlc3Rpb24gbXVzdCBoYXZlOlxyXG4tIEEgY2xlYXIgcXVlc3Rpb24gdGV4dC5cclxuLSBGb3VyIGFuc3dlciBvcHRpb25zIGxhYmVsZWQgQSwgQiwgQywgYW5kIEQuXHJcbi0gVGhlIGNvcnJlY3QgYW5zd2VyIHNwZWNpZmllZCBhcyB0aGUgb3B0aW9uIGxldHRlci5cclxuXHJcblByb3ZpZGUgdGhlIG91dHB1dCBpbiB2YWxpZCBKU09OIGZvcm1hdCB3aXRoIHRoZSBmb2xsb3dpbmcgc3RydWN0dXJlOlxyXG5cclxue1xyXG4gIFwidG9waWNcIjogXCI8VE9QSUNfTkFNRT5cIixcclxuICBcInF1ZXN0aW9uc1wiOiBbXHJcbiAgICB7XHJcbiAgICAgIFwicXVlc3Rpb25cIjogXCI8UXVlc3Rpb24gdGV4dD5cIixcclxuICAgICAgXCJvcHRpb25zXCI6IHtcclxuICAgICAgICBcIkFcIjogXCI8T3B0aW9uIEEgdGV4dD5cIixcclxuICAgICAgICBcIkJcIjogXCI8T3B0aW9uIEIgdGV4dD5cIixcclxuICAgICAgICBcIkNcIjogXCI8T3B0aW9uIEMgdGV4dD5cIixcclxuICAgICAgICBcIkRcIjogXCI8T3B0aW9uIEQgdGV4dD5cIlxyXG4gICAgICB9LFxyXG4gICAgICBcImNvcnJlY3RfYW5zd2VyXCI6IFwiQVwiICAvLyBVc2UgdGhlIG9wdGlvbiBsZXR0ZXIgb25seVxyXG4gICAgfSxcclxuICAgIC4uLlxyXG4gIF1cclxufVxyXG5cclxuR2VuZXJhdGUgYXQgbGVhc3QgMTUgcXVlc3Rpb25zLlxyXG5cclxuRXhhbXBsZTpcclxue1xyXG4gIFwidG9waWNcIjogXCJQaG90b3N5bnRoZXNpc1wiLFxyXG4gIFwicXVlc3Rpb25zXCI6IFtcclxuICAgIHtcclxuICAgICAgXCJxdWVzdGlvblwiOiBcIldoaWNoIGdhcyBpcyBhYnNvcmJlZCBkdXJpbmcgcGhvdG9zeW50aGVzaXM/XCIsXHJcbiAgICAgIFwib3B0aW9uc1wiOiB7XHJcbiAgICAgICAgXCJBXCI6IFwiQ2FyYm9uIERpb3hpZGVcIixcclxuICAgICAgICBcIkJcIjogXCJPeHlnZW5cIixcclxuICAgICAgICBcIkNcIjogXCJOaXRyb2dlblwiLFxyXG4gICAgICAgIFwiRFwiOiBcIkh5ZHJvZ2VuXCJcclxuICAgICAgfSxcclxuICAgICAgXCJjb3JyZWN0X2Fuc3dlclwiOiBcIkFcIlxyXG4gICAgfSxcclxuICAgIC4uLlxyXG4gIF1cclxufVxyXG4gIFxyXG5Ob3cgZ2VuZXJhdGUgdGhlIHF1aXogb246ICR7Y2hhcHRlcnN9XHJcbmA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBQUk9NUFQgPSBgXHJcbiAgXHJcbiAgXCJ0ZXh0XCI6IFwiR2VuZXJhdGUgbXVsdGlwbGUgY29uY2VwdHVhbCBxdWVzdGlvbi1hbmQtYW5zd2VyIHBhaXJzIGJhc2VkIG9uIHRoZSBmb2xsb3dpbmcgY2hhcHRlcnMtLS0tXHJcbiAgIEZvciBlYWNoIGNoYXB0ZXIsIGdlbmVyYXRlIGF0IGxlYXN0IDctMTAgIHF1ZXN0aW9uLWFuc3dlciBwYWlycy4gVGhlIG91dHB1dCBzaG91bGQgYmUgaW4gdmFsaWQgSlNPTiBmb3JtYXQgb25seSwgc3RydWN0dXJlZCBhcyBhbiBhcnJheSBvZiBvYmplY3RzLiBFYWNoIG9iamVjdCBtdXN0IGNvbnRhaW4gdHdvIGZpZWxkczogXFxcInF1ZXN0aW9uXFxcIiBhbmQgXFxcImFuc3dlclxcXCIuIFRoZSBcXFwicXVlc3Rpb25cXFwiIGZpZWxkIHNob3VsZCBjb250YWluIHRoZSBxdWVzdGlvbiBpbiBhbiA8aDI+IEhUTUwgdGFnLiBUaGUgXFxcImFuc3dlclxcXCIgZmllbGQgc2hvdWxkIGNvbnRhaW4gYSBkZXRhaWxlZCBleHBsYW5hdGlvbiBpbiBIVE1MIHVzaW5nIHRhZ3MgbGlrZSA8cD4sIDx1bD4sIDxsaT4sIDxiPiwgPGk+LCA8Y29kZT4sIGFuZCA8cHJlPi4gRG8gbm90IGluY2x1ZGUgYW55IG1hcmtkb3duIHN5bnRheCwgdHJpcGxlIGJhY2t0aWNrcywgb3Igbm9uLUpTT04gdGV4dC4gUmV0dXJuIG9ubHkgYSBjbGVhbiBKU09OIGFycmF5IHdpdGhvdXQgYW55IGNvbW1lbnRzIG9yIGV4dHJhIGV4cGxhbmF0aW9uLlwiXHJcblxyXG4gICBGb3JtYXQgb2YgdGhlIHF1ZXN0aW9uIGFuZCBBbnN3ZXJzIC0+XHJcbiAgIC0gUXVlc3Rpb24gbXVzdCBiZSBpbiBoMiBhbmQgaW4gYm9sZCB3aXRoIG1hcmdpbiBmcm9tIHRvcCBhbmQgYm90dG9tLlxyXG4gICAtIEFuc3dlciBpbmNsdWRlIGRpZmZlcmVudCB0eXBlcyBvZiB0aHIgcmljaCBjb250ZW50IGFuZCBjb250YWluIHRoZSBib2xkIHN1YmhlYWRpbmdzIGFuZCBtYXJnaW4gcGFkZGluZyB0YWJsZXMgY29udGFpbmVyIHdoZXJ2ZXIgcmVxdWlyZWQgd2l0aCB0aGUgc3VpdGFibGUgZXhhbXBsZXMuLiFcclxuXHJcbiAgICAgICAgXHJcbiAgTm93ICBHZW5lcmF0ZSBhIHF1ZXN0aW9uIGFuZCBpdHMgZGV0YWlsZWQgYW5zd2VyIG9uIHRoZSB0b3BpYzogJHtjaGFwdGVyc31cclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBgO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRiXHJcbiAgICAgIC5pbnNlcnQoU1RVRFlfVFlQRV9DT05URU5UX1RBQkxFKVxyXG4gICAgICAudmFsdWVzKHtcclxuICAgICAgICBjb3Vyc2VJZDogY291cnNlSWQsXHJcbiAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgfSlcclxuICAgICAgLnJldHVybmluZyh7XHJcbiAgICAgICAgaWQ6IFNUVURZX1RZUEVfQ09OVEVOVF9UQUJMRS5pZCxcclxuICAgICAgfSk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCLwn6egIFNlbmRpbmcgSW5uZ2VzdCBldmVudDpcIiwge1xyXG4gICAgICBuYW1lOiBcInN0dWR5VHlwZS5jb250ZW50XCIsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBzdHVkeVR5cGU6IHR5cGUsXHJcbiAgICAgICAgcHJvbXB0OiBQUk9NUFQsXHJcbiAgICAgICAgY291cnNlSWQ6IGNvdXJzZUlkLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgYXdhaXQgaW5uZ2VzdC5zZW5kKHtcclxuICAgICAgbmFtZTogXCJzdHVkeVR5cGUuY29udGVudFwiLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgc3R1ZHlUeXBlOiB0eXBlLFxyXG4gICAgICAgIHByb21wdDogUFJPTVBULFxyXG4gICAgICAgIGNvdXJzZUlkOiBjb3Vyc2VJZCxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24ocmVzdWx0WzBdKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGluIHN0dWR5LXR5cGUtY29udGVudCBBUEk6XCIsIGVycm9yKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgeyBlcnJvcjogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIiB9LFxyXG4gICAgICB7IHN0YXR1czogNTAwIH1cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJTVFVEWV9UWVBFX0NPTlRFTlRfVEFCTEUiLCJOZXh0UmVzcG9uc2UiLCJkYiIsImlubmdlc3QiLCJyZXZhbGlkYXRlIiwiZHluYW1pYyIsIlBPU1QiLCJyZXEiLCJjaGFwdGVycyIsImNvdXJzZUlkIiwidHlwZSIsImpzb24iLCJQUk9NUFQiLCJyZXN1bHQiLCJpbnNlcnQiLCJ2YWx1ZXMiLCJyZXR1cm5pbmciLCJpZCIsImNvbnNvbGUiLCJsb2ciLCJuYW1lIiwiZGF0YSIsInN0dWR5VHlwZSIsInByb21wdCIsInNlbmQiLCJlcnJvciIsInN0YXR1cyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/generate-study-type-content/route.js\n");

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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgenerate-study-type-content%2Froute&page=%2Fapi%2Fgenerate-study-type-content%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgenerate-study-type-content%2Froute.js&appDir=C%3A%5CUsers%5CVinayak%5CDesktop%5CFull_Stack_Projects%5Cprep-ai%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CVinayak%5CDesktop%5CFull_Stack_Projects%5Cprep-ai&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgenerate-study-type-content%2Froute&page=%2Fapi%2Fgenerate-study-type-content%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgenerate-study-type-content%2Froute.js&appDir=C%3A%5CUsers%5CVinayak%5CDesktop%5CFull_Stack_Projects%5Cprep-ai%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CVinayak%5CDesktop%5CFull_Stack_Projects%5Cprep-ai&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Vinayak_Desktop_Full_Stack_Projects_prep_ai_app_api_generate_study_type_content_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/generate-study-type-content/route.js */ \"(rsc)/./app/api/generate-study-type-content/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/generate-study-type-content/route\",\n        pathname: \"/api/generate-study-type-content\",\n        filename: \"route\",\n        bundlePath: \"app/api/generate-study-type-content/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Vinayak\\\\Desktop\\\\Full_Stack_Projects\\\\prep-ai\\\\app\\\\api\\\\generate-study-type-content\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_Vinayak_Desktop_Full_Stack_Projects_prep_ai_app_api_generate_study_type_content_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZnZW5lcmF0ZS1zdHVkeS10eXBlLWNvbnRlbnQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmdlbmVyYXRlLXN0dWR5LXR5cGUtY29udGVudCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmdlbmVyYXRlLXN0dWR5LXR5cGUtY29udGVudCUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNWaW5heWFrJTVDRGVza3RvcCU1Q0Z1bGxfU3RhY2tfUHJvamVjdHMlNUNwcmVwLWFpJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNWaW5heWFrJTVDRGVza3RvcCU1Q0Z1bGxfU3RhY2tfUHJvamVjdHMlNUNwcmVwLWFpJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUMwRDtBQUN2STtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcVmluYXlha1xcXFxEZXNrdG9wXFxcXEZ1bGxfU3RhY2tfUHJvamVjdHNcXFxccHJlcC1haVxcXFxhcHBcXFxcYXBpXFxcXGdlbmVyYXRlLXN0dWR5LXR5cGUtY29udGVudFxcXFxyb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvZ2VuZXJhdGUtc3R1ZHktdHlwZS1jb250ZW50L3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvZ2VuZXJhdGUtc3R1ZHktdHlwZS1jb250ZW50XCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9nZW5lcmF0ZS1zdHVkeS10eXBlLWNvbnRlbnQvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxWaW5heWFrXFxcXERlc2t0b3BcXFxcRnVsbF9TdGFja19Qcm9qZWN0c1xcXFxwcmVwLWFpXFxcXGFwcFxcXFxhcGlcXFxcZ2VuZXJhdGUtc3R1ZHktdHlwZS1jb250ZW50XFxcXHJvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgenerate-study-type-content%2Froute&page=%2Fapi%2Fgenerate-study-type-content%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgenerate-study-type-content%2Froute.js&appDir=C%3A%5CUsers%5CVinayak%5CDesktop%5CFull_Stack_Projects%5Cprep-ai%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CVinayak%5CDesktop%5CFull_Stack_Projects%5Cprep-ai&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/drizzle-orm","vendor-chunks/@neondatabase","vendor-chunks/@opentelemetry","vendor-chunks/debug","vendor-chunks/ms","vendor-chunks/supports-color","vendor-chunks/has-flag","vendor-chunks/inngest","vendor-chunks/tr46","vendor-chunks/zod","vendor-chunks/node-fetch","vendor-chunks/whatwg-url","vendor-chunks/hash.js","vendor-chunks/color-convert","vendor-chunks/chalk","vendor-chunks/@inngest","vendor-chunks/webidl-conversions","vendor-chunks/color-name","vendor-chunks/serialize-error-cjs","vendor-chunks/inherits","vendor-chunks/json-stringify-safe","vendor-chunks/canonicalize","vendor-chunks/cross-fetch","vendor-chunks/minimalistic-assert"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgenerate-study-type-content%2Froute&page=%2Fapi%2Fgenerate-study-type-content%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgenerate-study-type-content%2Froute.js&appDir=C%3A%5CUsers%5CVinayak%5CDesktop%5CFull_Stack_Projects%5Cprep-ai%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CVinayak%5CDesktop%5CFull_Stack_Projects%5Cprep-ai&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();