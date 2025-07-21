"use client"
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FlashcardItem from './_components/FlashcardItem';


const Flashcards = () => {
    
    const { courseId } = useParams();
    const [flashCards, setFlashCards] = useState([]);
    const [isFlipped, setIsFlipped] = useState();
  
    useEffect(() => {
    GetFlashCards()
},[])

    const GetFlashCards = async () => {
        const result = await axios.post('/api/study-type', {
            courseId: courseId,
            studyType:'flashCard'
        })
        setFlashCards(result?.data?.content?.flashcards)

        // console.log(result?.data?.content?.flashcards)
    }

    const handleClick = () => {
        setIsFlipped(!isFlipped)
    }
  return (
      <div >
          <h2 className='font-bold text-2xl'>Flashcards</h2>
          <p className='mt-2 font-semibold'>Flashcards: The Ultimate Tool to Lock in Concepts!</p>
          <div>
             
                 <FlashcardItem  handleClick={handleClick} isFlipped={isFlipped} flashCards={flashCards}  />

              
          
            </div>
         
    </div>
  )
}

export default Flashcards