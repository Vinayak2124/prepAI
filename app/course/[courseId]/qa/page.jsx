"use client";

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';



const Qa = () => {
  const [qa, setQa] = useState([]);
  const { courseId } = useParams();
  const [stepCount, setStepCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setStepCount(0)
    fetchQA();
  }, []);

  const fetchQA = async () => {
    try {
      const {data} = await axios.post('/api/study-type', {
        courseId: courseId,
        studyType: 'qa'
      });
      setQa(data[0]?.content);
      console.log(data[0]?.content);
    } catch (err) {
      console.error("Failed to fetch QA:", err);
    }
  };

    return (
    <div className="p-4">
      {/* Step Indicator */}
      <div className='flex gap-5 items-center mb-6'>
        {stepCount !== 0 && (
          <Button variant="ghost" size="sm" onClick={() => setStepCount(stepCount - 1)}>
            Previous
          </Button>
        )}
        {qa?.map((_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full ${index <= stepCount ? "bg-blue-600" : "bg-gray-200"}`}
          ></div>
        ))}
        {stepCount < qa?.length - 1 && (
          <Button variant="outline" size="sm" onClick={() => setStepCount(stepCount + 1)}>
            Next
          </Button>
        )}
      </div>

      {/* Main Q&A Display */}
      <div className="space-y-4">
        <div dangerouslySetInnerHTML={{ __html: qa[stepCount]?.question  }} />
        <div dangerouslySetInnerHTML={{ __html: qa[stepCount]?.answer  }} />

        {/* Show "Go to Course Page" only on last question */}
        {stepCount === qa?.length - 1 && (
          <div className="mt-6">
            <Button onClick={() => router.back()}>Go to Course Page</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Qa;
