import { CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import db from "@/configs/db";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const { courseId, studyType } = await req.json();

  if (!courseId || !studyType) {
    return new NextResponse(JSON.stringify({ error: "Missing courseId or studyType" }), {
      status: 400,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "application/json",
      },
    });
  }


  if (studyType === "ALL") {
    const [notes, contentList] = await Promise.all([
      db.select().from(CHAPTER_NOTES_TABLE).where(eq(CHAPTER_NOTES_TABLE.courseId, courseId)),
      db.select().from(STUDY_TYPE_CONTENT_TABLE).where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId)),
    ]);

    const result = {
      notes,
      flashCard: contentList.find((item) => item.type === "flashCard"),
      quiz: contentList.find((item) => item.type === "quiz"),
      qa: contentList.find((item) => item.type === "qa"),
    };

    return new NextResponse(JSON.stringify(result), {
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "application/json",
      },
    });
  }


  if (studyType === "notes") {
    const notes = await db
      .select()
      .from(CHAPTER_NOTES_TABLE)
      .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

    return new NextResponse(JSON.stringify(notes), {
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "application/json",
      },
    });
  }


  if (studyType === "qa") {
    const qa = await db
      .select()
      .from(STUDY_TYPE_CONTENT_TABLE)
      .where(
        and(
          eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
          eq(STUDY_TYPE_CONTENT_TABLE.type, "qa")
        )
      );

    return new NextResponse(JSON.stringify(qa), {
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "application/json",
      },
    });
  }


  const content = await db
    .select()
    .from(STUDY_TYPE_CONTENT_TABLE)
    .where(
      and(
        eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
        eq(STUDY_TYPE_CONTENT_TABLE.type, studyType)
      )
    );

  return new NextResponse(JSON.stringify(content[0]), {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json",
    },
  });
}
