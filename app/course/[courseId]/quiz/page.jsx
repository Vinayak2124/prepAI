"use client"
import axios from 'axios'

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import StepBarProgress from './_components/StepBarProgress'
import QuizCardItem from './_components/QuizCardItem'


const Quiz = () => {
    const { courseId } = useParams()
    const [quizData, setQuizData] = useState();
    const [stepCount, setStepCount] = useState(0);
    const [correctAns, setCorrectAns] = useState(null);
    const [actualcorrect,setActualCorrect]=useState(null)
    console.log(courseId)
    useEffect(() => {
    GetQuiz()
},[])

    const GetQuiz = async () => {
       
        const result = await axios.post('/api/study-type', {
            courseId: courseId,
            studyType:"quiz"
        })
        setQuizData(result?.data?.content?.questions)
        console.log(result?.data?.content?.questions)
        console.log(result)
    }
    const checkAnswer = (userAnswer, currentQuestion) => {
        setActualCorrect(currentQuestion.correct_answer)
        // console.log(userAnswer)
        if (userAnswer === currentQuestion.correct_answer) {
            setCorrectAns(true)

        } else {
            setCorrectAns(false)
        }
    }
    useEffect(() => {
        setActualCorrect(null)
        setCorrectAns(null)
        
    },[stepCount])

  return (
      <div>
          
          <h2 className='font-bold text-2xl'>Quiz</h2>
          <StepBarProgress data={quizData} stepCount={stepCount} setStepCount={(v) => setStepCount(v)} />
          
          <div>
              {/* {
                  quizData && quizData.map((item, index) =>( */}
                     {  quizData && <QuizCardItem quiz={quizData[stepCount]} userSelectedOption={(v)=>checkAnswer(v,quizData[stepCount])}/>}
                  {/* ))
              } */}
          </div>

          {correctAns == false && <div>
              <div className='mt-4'>
              <div className='border p-3 border-red-700 bg-red-200 rounded-lg'>
                      <h2 className='font-bold text-lg text-red-700'>❌ Incorrect choice...!</h2>
                      <p className='text-md  font-semibold bg-green-700 p-2 px-4 m-1 rounded-full '>Correct option is : { actualcorrect}</p>
                      <p className='text-red-500'>Better luck Next time !</p>
                      
            </div>
              </div>
          </div>
          }
          {correctAns == true && <div>
              <div className='border p-3 border-green-700 bg-green-200 rounded-lg'>
                  <h2 className='font-bold text-lg text-green-700'>✅ Correct choice...!</h2>
                  <p className='text-green-500'>Your Answer is correct</p>
            </div>
          </div>
          }
    </div>
  )
}

export default Quiz