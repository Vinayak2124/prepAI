"use client";
import { useUser } from '@clerk/nextjs'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import CourseCardItem from './CourseCardItem';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { CourseCountContext } from '@/app/_context/CourseCountContext';

const CourseList = () => {
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const {totalCourse,setTotalCourse} = useContext(CourseCountContext)
    useEffect(() => {
        user && GetCourseList();
    },[user])
    const GetCourseList = async () => {
        setLoading(true)
        const result = await axios.post('/api/courses', { createdBy: user?.primaryEmailAddress?.emailAddress })
        console.log(result)
        setCourseList(result.data.result)
        setLoading(false)
        setTotalCourse(result.data.result?.length);
    }
  return (
      <div className='mt-10'>
          <h2 className='font-bold text-2xl flex justify-between items-center'>Your Study Material
              
              <Button onClick={GetCourseList} variant="outline" className="border-primary text-primary"><RefreshCw/> Refresh</Button>
          </h2>


          <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-3 gap-7'>
          {loading == false? courseList?.map((course, index) => (
  <CourseCardItem course={course} key={index} />
          )) :  

                  [1, 2, 3, 4, 5, 6].map((items, index) => (
                      <div key={index} className='h-56 w-full bg-slate-100 rounded-lg animate-pulse'>
                          
            </div>
        ))

} 

          </div>
          

    </div>
  )
}

export default CourseList