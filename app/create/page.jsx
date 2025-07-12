"use client"
import React,{useState} from 'react';
import SelectOption from "./_components/SelectOption.jsx"
import {Button }from "@/components/ui/button.jsx"
import TopicInput from './_components/TopicInput.jsx';
import { useUser } from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation.js';
import { toast } from 'sonner';


 function CreateCourse () {
    const [step, setStep] = useState(0);
    const [formData, setFormdata] = useState([]);
     const { user } = useUser();
     const [loading, setLoading] = useState(false)
     
     const router = useRouter();
     
    const handleUserInput = (fieldName, fieldValue) => {
        setFormdata(prev => ({
            ...prev,
            [fieldName]: fieldValue
        }))
        console.log(formData);
    }
    
    function generateRandomUUID() {
        return crypto.randomUUID();
      }
      

      const GenerateCourseOutline = async () => {
        try {
            const courseId = generateRandomUUID();
            setLoading(true);
          const res = await axios.post('/api/generate-course-outline', {
            courseId,
            ...formData,
            createdBy: user?.primaryEmailAddress?.emailAddress
          });
            setLoading(false)
          router.replace('/dashboard');
          toast("Your course content is being generated. This may take a minute. Please click the Refresh button after a minute!");

          console.log("✅ Result:", res.data);
        } catch (error) {
          

          console.error("❌ Error generating course outline:", error);
            // Also log server response:
          console.log("Server response:", error.response?.data);
        }
      };
      
    
        return (
            <div className="flex flex-col items-center p-5 md:px-24 lg:px-36 mt-20 ">
                <h2 className="font-bold text-4xl text-blue-700">Start Building Your Personal Study Material</h2>
                <p className="text-gray-500 text-lg mt-3"> Fill All the details in order to generate study material </p>

                <div>
                    {step == 0 ? <SelectOption selectedStudyType={(value) => handleUserInput('courseType', value)} />
                        : <TopicInput setTopic={(value) => handleUserInput('topic', value)}
                            setDiffcultyLevel={(value) => handleUserInput('difficultyLevel', value)} />}
                </div>
                <div className="flex justify-between w-full mt-32">
                    {step != 0 ? <Button onClick={() => setStep(step - 1)} variant="outline">Previous</Button> : <Button className="line-through hover:scale-95 text-gray-200" variant="desctructive">Previous</Button>}
                    {step == 0 ? <Button onClick={() => setStep(step + 1)} className="bg-blue-600 hover:bg-blue-700">Next</Button>
                        : <Button onClick={GenerateCourseOutline} disabled={loading} className="bg-blue-600 hover:scale-95 hover:bg-blue-700">{loading?<Loader className='animate-spin'/>:'Generate'}</Button>}
                </div>
            </div>


        )
    }

export default CreateCourse;