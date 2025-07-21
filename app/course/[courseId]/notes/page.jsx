"use client"
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'

const ViewNotes = () => {
    const [notes, setNotes] = useState();
    const { courseId } = useParams();
    const [stepCount, setStepCount] = useState(0);
    const router = useRouter();

    useEffect(() => {
        GetNotes()
    },[])
    const GetNotes = async() => {
        const result = await axios.post('/api/study-type', {
            courseId: courseId,
            studyType:'notes'
        }) 
        console.log(result?.data)
        setNotes(result?.data)   
        console.log(result?.data[0])
    }
    
    return (
    
      <div> 
            <div className='flex gap-5 items-center'>
                {stepCount!=0&&<Button variant="ghost" size="sm" onClick={()=>setStepCount(stepCount-1)}>Previous</Button>}
                {
                    notes?.map((item, index) => (
                        <div key={index} className={`w-full h-2 rounded-full ${index<stepCount?"bg-blue-600":"bg-gray-200"}`}></div>

                    ))
                }
                  <Button variant="outline" size="sm" onClick={()=>setStepCount(stepCount+1)}>Next</Button>
            </div>
            <div>
                <div dangerouslySetInnerHTML={{__html:(notes?.[stepCount]?.notes)?.replace('```html',' ')}}>
                   
                </div>
                {
                        notes?.length == stepCount && <div className='flex items-center gap-10 flex-col justify-center mt-5'>
                            <h2>End of Notes</h2>
                            <Button onClick={()=>router.back()}>Go to Course Page</Button>
                        </div>
                    }
            </div>

    </div>
  )
}

export default ViewNotes