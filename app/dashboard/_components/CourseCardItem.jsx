import { Progress } from '@/components/ui/progress'
import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import {RefreshCw } from 'lucide-react'
import Link from 'next/link'

const CourseCardItem = ({course}) => {
  return (
      <div className='border bg-slate-100 rounded-2xl p-5 px-7'>
          <div>
              <div className='flex justify-between items-center'>
                  <Image src={'/courses_logo.png'} alt='logo' width={50} height={50} />
                  
                  <h2 className='text-[15px] p-1 px-2 rounded-full bg-yellow-300 font-bold'>{ course?.difficultyLevel }</h2>
              </div>
              <h2 className='mt-3 font-medium text-2xl'>{course?.topic}</h2>
              <p className='text-[14px] line-clamp-2 text-slate-700 mt-2'>{course?.courseLayout?.CourseSummary?.CourseDescription}</p>
              <div className='mt-3 w-full items-center flex  justify-between gap-5 '>
              
              
              
              
              <div >{ course?.status=='Generating'? <h3 className='bg-gray-500 rounded-full text-white p-2 flex items-center gap-2 text-sm'> <RefreshCw className='h-5 w-5 animate-spin' />Generating...</h3>
                 : <Link href={`/course/${course?.courseId}`}><Button className="bg-blue-600 hover:scale-95 hover:bg-blue-700">View</Button> </Link>}
            
            </div>
          </div>
          </div>
          </div>
  )
}

export default CourseCardItem