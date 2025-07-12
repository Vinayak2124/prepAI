(()=>{var e={};e.id=560,e.ids=[560],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},11997:e=>{"use strict";e.exports=require("punycode")},16698:e=>{"use strict";e.exports=require("node:async_hooks")},21820:e=>{"use strict";e.exports=require("os")},27910:e=>{"use strict";e.exports=require("stream")},28354:e=>{"use strict";e.exports=require("util")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},34380:(e,t,r)=>{"use strict";r.d(t,{A:()=>n});let n=(0,r(71633).fd)("postgresql://Prep-AI-Smart-Study-Material_owner:npg_5feuEw7bZcHU@ep-tight-rain-a1p8nyrb-pooler.ap-southeast-1.aws.neon.tech/Prep-AI-Smart-Study-Material?sslmode=require")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},47565:(e,t,r)=>{"use strict";r.d(t,{J0:()=>d,SX:()=>h,fU:()=>p,rJ:()=>l});var n=r(96017),a=r(61546),o=r(50033),s=r(79252),i=r(54693),u=r(34359),c=r(29334);let d=(0,a.cJ)("users",{id:(0,o.vX)().primaryKey(),name:(0,s.yf)().notNull(),email:(0,s.yf)().notNull(),isMember:(0,i.zM)().notNull().default(!1)}),l=(0,a.cJ)("studymaterial",{id:(0,o.vX)().primaryKey(),courseId:(0,s.yf)().notNull(),courseType:(0,s.yf)().notNull(),topic:(0,s.yf)().notNull(),difficultyLevel:(0,s.yf)().default("Easy"),courseLayout:(0,u.Pq)().$default("Nothing"),createdBy:(0,s.yf)().notNull(),status:(0,s.yf)().default("Generating")}),p=(0,a.cJ)("chapterNotes",{id:(0,o.vX)().primaryKey(),courseId:(0,s.yf)().notNull(),chapterId:(0,n.nd)().notNull(),notes:(0,c.Qq)()}),h=(0,a.cJ)("studyTypeContent",{id:(0,o.vX)().primaryKey(),courseId:(0,s.yf)().notNull(),content:(0,u.Pq)(),type:(0,s.yf)().notNull(),status:(0,s.yf)().default("Generating")})},50561:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>g,routeModule:()=>p,serverHooks:()=>f,workAsyncStorage:()=>h,workUnitAsyncStorage:()=>y});var n={};r.r(n),r.d(n,{POST:()=>l});var a=r(96559),o=r(48088),s=r(37719),i=r(47565),u=r(32190),c=r(34380),d=r(55220);async function l(e){try{let t,{chapters:r,courseId:n,type:a}=await e.json();t="flashCard"===a?`
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

Now, generate the flashcards for the following chapters: ${r}
`:"quiz"===a?`
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
  
Now generate the quiz on: ${r}
`:`
  
  "text": "Generate multiple conceptual question-and-answer pairs based on the following chapters----
   For each chapter, generate at least 7-10  question-answer pairs. The output should be in valid JSON format only, structured as an array of objects. Each object must contain two fields: "question" and "answer". The "question" field should contain the question in an <h2> HTML tag. The "answer" field should contain a detailed explanation in HTML using tags like <p>, <ul>, <li>, <b>, <i>, <code>, and <pre>. Do not include any markdown syntax, triple backticks, or non-JSON text. Return only a clean JSON array without any comments or extra explanation."

   Format of the question and Answers ->
   - Question must be in h2 and in bold with margin from top and bottom.
   - Answer include different types of thr rich content and contain the bold subheadings and margin padding tables container wherver required with the suitable examples..!

        
  Now  Generate a question and its detailed answer on the topic: ${r}
        
        
        `;let o=await c.A.insert(i.SX).values({courseId:n,type:a}).returning({id:i.SX.id});return await d.V.send({name:"studyType.content",data:{studyType:a,prompt:t,courseId:n}}),u.NextResponse.json(o[0])}catch(e){return console.error("Error in study-type-content API:",e),u.NextResponse.json({error:"Internal Server Error"},{status:500})}}let p=new a.AppRouteRouteModule({definition:{kind:o.RouteKind.APP_ROUTE,page:"/api/generate-study-type-content/route",pathname:"/api/generate-study-type-content",filename:"route",bundlePath:"app/api/generate-study-type-content/route"},resolvedPagePath:"C:\\Users\\Vinayak\\Desktop\\Full_Stack_Projects\\prep-ai\\app\\api\\generate-study-type-content\\route.js",nextConfigOutput:"",userland:n}),{workAsyncStorage:h,workUnitAsyncStorage:y,serverHooks:f}=p;function g(){return(0,s.patchFetch)({workAsyncStorage:h,workUnitAsyncStorage:y})}},55220:(e,t,r)=>{"use strict";r.d(t,{V:()=>n});let n=new(r(52880)).Inngest({id:"prepAI",eventKey:"pqEjIXTRCBm6Xvh6IRW0SOSLN0oBPdShtxSm4tHBGoggFjlREzXY89BkJM9NGf7VBDGtwsCzoP6qEBL_F7K8_Q",signingKey:"signkey-prod-07c3c54f5880c5b170cf2985e5ca7736151509931490b81b6646abef4c1adbe3"})},55591:e=>{"use strict";e.exports=require("https")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},74075:e=>{"use strict";e.exports=require("zlib")},78335:()=>{},79551:e=>{"use strict";e.exports=require("url")},81630:e=>{"use strict";e.exports=require("http")},83997:e=>{"use strict";e.exports=require("tty")},96487:()=>{}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[719,190,199,880],()=>r(50561));module.exports=n})();