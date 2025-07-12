// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

// import { GoogleGenAI } from "@google/genai";

// export const courseOutlineGenerateAIModel = new GoogleGenAI({
//   apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
// });
// const config = {
//   responseMimeType: "application/json",
// };
// const model = "gemini-2.0-flash-lite";
// const contents = [
//   {
//     role: "user",
//     parts: [
//       {
//         text: ` \`Generate comprehensive study material for the topic "${coding}" for a "${Python}" course at "${moderate}" level, and provide the result strictly in valid JSON format containing: a CourseSummary giving an overview of the entire course; a Chapters array, where each chapter has a ChapterTitle, a ChapterSummary explaining the chapter, and a Topics array listing key topics in that chapter. Use clear, concise language suitable for the difficulty level, keep the JSON clean and consistent, and do not include any extra text or explanations outside the JSON output.\`;
// `,
//       },
//     ],
//   },
//   {
//     role: "model",
//     parts: [
//       {
//         text: `\`\`\`json
// {
//   "CourseSummary": {
//     "CourseName": "Python Coding - Moderate Level",
//     "CourseDescription": "This course provides a comprehensive understanding of Python coding, building upon introductory concepts. It covers advanced data structures, object-oriented programming, file handling, error handling, and introduction to modules and packages. The course prepares learners to write more complex and efficient Python code.",
//     "DifficultyLevel": "Moderate",
//     "Prerequisites": "Basic Python knowledge (variables, data types, control flow, functions)."
//   },
//   "Chapters": [
//     {
//       "ChapterTitle": "Advanced Data Structures",
//       "ChapterSummary": "This chapter delves into more sophisticated data structures beyond lists, dictionaries, and tuples. It covers sets, comprehensions, and explores the strengths and weaknesses of each in various use cases.",
//       "Topics": [
//         "Sets and their operations (union, intersection, difference)",
//         "List comprehensions and their benefits",
//         "Dictionary comprehensions",
//         "Set comprehensions",
//         "Comparison of data structure performance"
//       ]
//     },
//     {
//       "ChapterTitle": "Object-Oriented Programming (OOP) - Part 1",
//       "ChapterSummary": "An introduction to the fundamentals of object-oriented programming. This chapter focuses on classes, objects, and basic OOP concepts such as encapsulation, inheritance, and polymorphism.",
//       "Topics": [
//         "Classes and objects",
//         "Attributes and methods",
//         "Encapsulation (public, private, protected attributes)",
//         "Inheritance (single and multiple)",
//         "Polymorphism (method overriding)"
//       ]
//     },
//     {
//       "ChapterTitle": "Object-Oriented Programming (OOP) - Part 2",
//       "ChapterSummary": "Building upon the OOP basics, this chapter explores more advanced concepts like abstract classes, interfaces, and design patterns, further improving code organization and reusability.",
//       "Topics": [
//         "Abstract classes and methods",
//         "Interfaces (using abstract base classes)",
//         "Class methods and static methods",
//         "Magic methods (dunder methods)",
//         "Design patterns (brief introduction)"
//       ]
//     },
//     {
//       "ChapterTitle": "File Handling",
//       "ChapterSummary": "Learn how to interact with files, including reading from and writing to text and binary files. This includes error handling when working with files.",
//       "Topics": [
//         "Opening and closing files",
//         "Reading and writing text files",
//         "Reading and writing binary files",
//         "File modes (read, write, append)",
//         "Context managers (with statement)",
//         "Error handling (e.g., FileNotFoundError)"
//       ]
//     },
//     {
//       "ChapterTitle": "Error Handling and Exception Handling",
//       "ChapterSummary": "Master the techniques for anticipating and handling errors in Python. This chapter introduces try-except blocks, raising exceptions, and creating custom exception classes.",
//       "Topics": [
//         "Try-except blocks",
//         "Specific exception types",
//         "The finally block",
//         "Raising exceptions (raise keyword)",
//         "Creating custom exception classes"
//       ]
//     },
//     {
//       "ChapterTitle": "Modules and Packages",
//       "ChapterSummary": "Learn how to organize code into reusable modules and packages. This chapter covers importing modules, using packages, and creating your own modules and packages.",
//       "Topics": [
//         "Importing modules (import statements)",
//         "Importing specific items from modules",
//         "Creating and using packages",
//         "The \`__init__.py\` file",
//         "Relative and absolute imports"
//       ]
//     },
//     {
//       "ChapterTitle": "Introduction to Regular Expressions",
//       "ChapterSummary": "This chapter provides an introduction to regular expressions (regex) and their use in pattern matching within strings. ",
//       "Topics": [
//           "Basic Regex Syntax",
//           "Matching patterns with re module",
//           "Character classes",
//           "Quantifiers",
//           "Grouping and capturing"
//       ]
//     }
//   ]
// }
// \`\`\``,
//       },
//     ],
//   },
// ];

//   const response = await ai.models.generateContentStream({
//     model,
//     config,
//     contents,
//   });
//   let fileIndex = 0;
//   for await (const chunk of response) {
//     console.log(chunk.text);
//   }
// }

import { GoogleGenAI } from "@google/genai";

export const genAI = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

export const generateNotesAIModel = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

export const generateStudyTypeContentAiModel = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});
export const generateQuizAIModel= new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});
export const generateQAAIModel = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});
