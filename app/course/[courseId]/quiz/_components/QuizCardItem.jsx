import { Button } from '@/components/ui/button'
import React,{useEffect, useState} from 'react'
export const revalidate =0
const QuizCardItem = ({ quiz,userSelectedOption }) => {
    const options = quiz?.options
    console.log(options)
    const [selectedOption, setSelectedOption] = useState()
    
    useEffect(() => {
        setSelectedOption(' ');
    },[quiz])
    
  return (
      <div className='mt-10 p-5'>
          <h2 className='font-medium text-3xl text-center'>{quiz?.question}</h2>
          
          <div className='mt-5 grid grid-cols-2 gap-4'>
          {options &&
          Object.entries(options).map(([key, value]) => (
           
              <h2 onClick={() => {setSelectedOption(key) ; userSelectedOption(key)}} key={key}
                  className={`w-full border border-gray-200 shadow-md text-center rounded-2xl text-lg py-4 px-3 cursor-pointer hover:bg-gray-400 hover:scale-95 hover:border-white
                  ${selectedOption==key&&'bg-blue-600 text-white'}
                  `}>
                  {key} : {value} </h2>
            
          ))}
          </div>
    </div>
  )
}

export default QuizCardItem