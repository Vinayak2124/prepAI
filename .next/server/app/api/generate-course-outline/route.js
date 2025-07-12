(()=>{var e={};e.id=642,e.ids=[642],e.modules={1708:e=>{"use strict";e.exports=require("node:process")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},11574:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>q,routeModule:()=>y,serverHooks:()=>m,workAsyncStorage:()=>x,workUnitAsyncStorage:()=>h});var s={};r.r(s),r.d(s,{POST:()=>d});var i=r(96559),o=r(48088),u=r(37719),a=r(71763),n=r(32190),c=r(34380),p=r(47565),l=r(55220);async function d(e){try{let{courseId:t,courseType:r,topic:s,createdBy:i,difficultyLevel:o}=await e.json(),u=`
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
    - The course topic is "${s}", for a "${r}" course at "${o}" level.
    `,d=await a.L8.models.generateContent({model:"gemini-2.0-flash-lite",contents:[{role:"user",parts:[{text:u}]}]});console.log(d);let y=d.candidates[0].content.parts[0].text,x=y.trim().match(/\{[\s\S]*\}/)?.[0],h=JSON.parse(x),m=await c.A.insert(p.rJ).values({courseId:t,courseType:r,topic:s,createdBy:i,difficultyLevel:o,courseLayout:h}).returning({resp:p.rJ}),q=await l.V.send({name:"notes.generate",data:{course:m[0].resp}});return console.log(q),n.NextResponse.json({result:m[0]})}catch(e){return console.error("API Route Error:",e),n.NextResponse.json({error:"Internal Server Error",details:e.message},{status:500})}}let y=new i.AppRouteRouteModule({definition:{kind:o.RouteKind.APP_ROUTE,page:"/api/generate-course-outline/route",pathname:"/api/generate-course-outline",filename:"route",bundlePath:"app/api/generate-course-outline/route"},resolvedPagePath:"C:\\Users\\Vinayak\\Desktop\\Full_Stack_Projects\\prep-ai\\app\\api\\generate-course-outline\\route.js",nextConfigOutput:"",userland:s}),{workAsyncStorage:x,workUnitAsyncStorage:h,serverHooks:m}=y;function q(){return(0,u.patchFetch)({workAsyncStorage:x,workUnitAsyncStorage:h})}},11723:e=>{"use strict";e.exports=require("querystring")},11997:e=>{"use strict";e.exports=require("punycode")},12412:e=>{"use strict";e.exports=require("assert")},16698:e=>{"use strict";e.exports=require("node:async_hooks")},21820:e=>{"use strict";e.exports=require("os")},27910:e=>{"use strict";e.exports=require("stream")},28354:e=>{"use strict";e.exports=require("util")},29021:e=>{"use strict";e.exports=require("fs")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33873:e=>{"use strict";e.exports=require("path")},34380:(e,t,r)=>{"use strict";r.d(t,{A:()=>s});let s=(0,r(71633).fd)("postgresql://Prep-AI-Smart-Study-Material_owner:npg_5feuEw7bZcHU@ep-tight-rain-a1p8nyrb-pooler.ap-southeast-1.aws.neon.tech/Prep-AI-Smart-Study-Material?sslmode=require")},34631:e=>{"use strict";e.exports=require("tls")},39727:()=>{},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},47565:(e,t,r)=>{"use strict";r.d(t,{J0:()=>p,SX:()=>y,fU:()=>d,rJ:()=>l});var s=r(96017),i=r(61546),o=r(50033),u=r(79252),a=r(54693),n=r(34359),c=r(29334);let p=(0,i.cJ)("users",{id:(0,o.vX)().primaryKey(),name:(0,u.yf)().notNull(),email:(0,u.yf)().notNull(),isMember:(0,a.zM)().notNull().default(!1)}),l=(0,i.cJ)("studymaterial",{id:(0,o.vX)().primaryKey(),courseId:(0,u.yf)().notNull(),courseType:(0,u.yf)().notNull(),topic:(0,u.yf)().notNull(),difficultyLevel:(0,u.yf)().default("Easy"),courseLayout:(0,n.Pq)().$default("Nothing"),createdBy:(0,u.yf)().notNull(),status:(0,u.yf)().default("Generating")}),d=(0,i.cJ)("chapterNotes",{id:(0,o.vX)().primaryKey(),courseId:(0,u.yf)().notNull(),chapterId:(0,s.nd)().notNull(),notes:(0,c.Qq)()}),y=(0,i.cJ)("studyTypeContent",{id:(0,o.vX)().primaryKey(),courseId:(0,u.yf)().notNull(),content:(0,n.Pq)(),type:(0,u.yf)().notNull(),status:(0,u.yf)().default("Generating")})},47990:()=>{},55220:(e,t,r)=>{"use strict";r.d(t,{V:()=>s});let s=new(r(52880)).Inngest({id:"prepAI",eventKey:"pqEjIXTRCBm6Xvh6IRW0SOSLN0oBPdShtxSm4tHBGoggFjlREzXY89BkJM9NGf7VBDGtwsCzoP6qEBL_F7K8_Q",signingKey:"signkey-prod-07c3c54f5880c5b170cf2985e5ca7736151509931490b81b6646abef4c1adbe3"})},55511:e=>{"use strict";e.exports=require("crypto")},55591:e=>{"use strict";e.exports=require("https")},57075:e=>{"use strict";e.exports=require("node:stream")},57975:e=>{"use strict";e.exports=require("node:util")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},71763:(e,t,r)=>{"use strict";r.d(t,{$s:()=>u,C5:()=>o,L8:()=>i,uv:()=>a,xJ:()=>n});var s=r(81769);let i=new s.M4({apiKey:"AIzaSyChls2rKeiuswh6dCwzzs_5iE_YlOKtORU"}),o=new s.M4({apiKey:"AIzaSyChls2rKeiuswh6dCwzzs_5iE_YlOKtORU"}),u=new s.M4({apiKey:"AIzaSyChls2rKeiuswh6dCwzzs_5iE_YlOKtORU"}),a=new s.M4({apiKey:"AIzaSyChls2rKeiuswh6dCwzzs_5iE_YlOKtORU"}),n=new s.M4({apiKey:"AIzaSyChls2rKeiuswh6dCwzzs_5iE_YlOKtORU"})},74075:e=>{"use strict";e.exports=require("zlib")},78335:()=>{},78474:e=>{"use strict";e.exports=require("node:events")},79428:e=>{"use strict";e.exports=require("buffer")},79551:e=>{"use strict";e.exports=require("url")},79646:e=>{"use strict";e.exports=require("child_process")},79748:e=>{"use strict";e.exports=require("fs/promises")},81630:e=>{"use strict";e.exports=require("http")},83997:e=>{"use strict";e.exports=require("tty")},91645:e=>{"use strict";e.exports=require("net")},94735:e=>{"use strict";e.exports=require("events")},96487:()=>{}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[719,190,199,880,769],()=>r(11574));module.exports=s})();