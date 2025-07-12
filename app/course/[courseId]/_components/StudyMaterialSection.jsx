import React, { useEffect, useState } from "react";
import MaterialCardItem from "./MaterialCardItem";
import axios from "axios";

const StudyMaterialSection = ({ courseId, course }) => {
  const [studyContent, setStudyContent] = useState();

  const MaterialList = [
    {
      name: "Notes/chapter",
      desc: "Read notes to prepare it",
      icon: "/notes1.jpeg",
      path: "/notes",
      type: "notes",
    },
    {
      name: "Flashcard",
      desc: "Flashcard helps to remember the concepts",
      icon: "/flashcard.jpg",
      path: "/flashcards",
      type: "flashCard",
    },
    {
      name: "Quiz",
      desc: "Great way to test your knowledge",
      icon: "/quiz.png",
      path: "/quiz",
      type: "quiz",
    },
    {
      name: "Question/Answer",
      desc: "Help to practice your learning",
      icon: "/qa.jpeg",
      path: "/qa",
      type: "qa",
    },
  ];

  useEffect(() => {
    GetStudyMaterial();
  }, []);

  const GetStudyMaterial = async () => {
    const result = await axios.post("/api/study-type", {
      courseId: courseId,
      studyType: "ALL",
    });

    console.log(result?.data);
    setStudyContent(result?.data);
  };

  return (
    <div>
      <h2 className="mt-5 font-medium text-xl">Study Materials :</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-3">
        {MaterialList.map((item, index) => (
          <MaterialCardItem
            key={index}
            item={item}
            studyContent={studyContent}
            course={course}
            refreshData={GetStudyMaterial}
            courseId={courseId} // pass ID so card can link to the page
          />
        ))}
      </div>
    </div>
  );
};

export default StudyMaterialSection;
