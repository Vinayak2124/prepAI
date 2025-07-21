import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link"; // ✅ Needed!
import React, { useState } from "react";
import axios from "axios";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
export const revalidate = 0;
const MaterialCardItem = ({ item, studyContent, course, refreshData, courseId }) => {
  const [loading, setLoading] = useState(false);
    const router = useRouter()
  const GenerateContent = async () => {
    try {
      setLoading(true);
      toast('Generating your Content..!')
      const chapters = course?.data?.result?.courseLayout?.Chapters
        ?.map((chapter) => chapter?.ChapterTitle)
        ?.join(", ");

      const result = await axios.post("/api/generate-study-type-content", {
        courseId: course?.data?.result?.courseId,
        chapters: chapters,
        type: item.type,
      });

      console.log(result);
      refreshData(true);
      toast('Your content is Read.! Refresh your page.. ')
      router.refresh()
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isReady = studyContent?.[item.type]?.length != null || studyContent?.[item.type]?.content


  return (
    <div
      className={`order shadow-md rounded-2xl bg-gray-100 flex flex-col px-2 py-5 items-center justify-center opacity-150 ${
        !isReady && "grayscale"
      }`}
    >
      <h2
        className={`text-sm rounded-full mb-3 p-1 px-2 text-center self-center text-white font-semibold ${
          isReady ? "bg-green-600" : "bg-gray-600"
        }`}
      >
        {isReady ? "Ready" : "Generate"}
      </h2>

      <Image src={item.icon} alt={item.name} width={100} height={100} />
      <h2 className="font-medium p-2">{item.name}</h2>
      <h2 className="text-sm text-gray-500">{item.desc}</h2>

      {!isReady ? (
        <Button
          variant="outline"
          className="mt-3 w-full rounded-xl hover:bg-blue-500 text-md flex items-center justify-center gap-2"
          onClick={GenerateContent}
          disabled={loading}
        >
          {loading && <RefreshCw className="animate-spin" />}
          {loading ? "Generating..." : "Generate"}
        </Button>
      ) : (
        <Link href={`/course/${courseId}${item.path}`} className="w-full">
          <Button
            variant="outline"
            className="mt-3 w-full hover:scale-95 rounded-xl hover:bg-blue-500 text-md"
          >
            View
          </Button>
        </Link>
      )}
    </div>
  );
};

export default MaterialCardItem;
