import Image from 'next/image'
import React from 'react'
import { Progress } from '@/components/ui/progress'


const CourseIntroCard = ({ course }) => {
    // console.log(course.data.result.courseLayout.CourseSummary.CourseName);
    
  return (
      <div className='flex gap-5 items-center p-10 border bg-slate-100 shadow-lg rounded-xl'>
          <Image src={'/study1.jpeg'} alt="study" width={200} height={200} />
          <div>
              <h2 className='font-bold text-2xl text-center'>{course?.data?.result?.courseLayout?.CourseSummary?.CourseName}</h2>
              <p className="mt-2 text-gray-500">{course?.data?.result?.courseLayout?.CourseSummary?.CourseDescription}</p>
              <Progress value={0} className='mt-3 ' />
        <p className='mt-3 text-lg text-primary'>Total Chapters : {course?.data?.result?.courseLayout?.Chapters.length}</p>
  
          </div>
    </div>
  )
}

export default CourseIntroCard