"use client"
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
const StepBarProgress = ({data, stepCount,setStepCount}) => {
 
    const router = useRouter();

    
    return (
    
        <div className='flex gap-5 items-center'>
            {
                stepCount != 0 && <Button variant="outline" size="sm" onClick={()=>setStepCount(stepCount-1)}>Prev</Button>

            }
                
            {
                data?.map((item, index) => (
                    <div key={index} className={`w-full h-2 rounded-full ${index<stepCount?'bg-blue-800':'bg-gray-200'}`}>

                    </div>
                ))
        }   
        <Button className="bg-blue-700 hover:bg-blue-800" size="sm" onClick={()=>setStepCount(stepCount+1)} >Next</Button>
            

    </div>
  )
}

export default StepBarProgress