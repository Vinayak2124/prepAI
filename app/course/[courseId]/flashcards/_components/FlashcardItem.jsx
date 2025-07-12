import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip'

const FlashcardItem = ({ flashCards }) => {
  const [step, setStep] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  // Flip handler
  const handleClick = () => setIsFlipped(!isFlipped)

  // Safe next / prev
  const handleNext = () => {
    if (step < flashCards.length - 1) {
      setStep(step + 1)
      setIsFlipped(false) // reset flip
    }
  }

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1)
      setIsFlipped(false) // reset flip
    }
  }

  return (
    <div className="flex flex-col items-center mt-10 gap-4">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <div
          className="p-4 bg-gradient-to-br from-yellow-400 to-yellow-600 text-zinc-900 flex items-center justify-center rounded-2xl cursor-pointer  h-[350px] w-[300px] shadow-xl md:h-[400px] md:w-[400px] animate-pulse"
          onClick={handleClick}
          key="front"
        >
          <h2 className='text-xl font-semibold'>{flashCards[step]?.front}</h2>
        </div>

        <div
          className="p-4 bg-gradient-to-br from-green-400 to-green-600 text-white flex items-center justify-center rounded-2xl cursor-pointer h-[350px] w-[300px] shadow-xl md:h-[400px] md:w-[400px] hover:scale-110"
          onClick={handleClick}
          key="back"
        >
          <h2 className=' text-md md:text-xl p-5'>{flashCards[step]?.back}</h2>
        </div>
      </ReactCardFlip>

      <div className="flex items-center justify-between w-full mt-4">
        <Button className=" hover:scale-95"
          variant="destructive"
          onClick={handlePrev}
          disabled={step === 0}
        >
          Previous
        </Button>
        <Button
          className="bg-blue-700 hover:bg-blue-800 hover:scale-95"
          onClick={handleNext}
          disabled={step === flashCards.length - 1}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default FlashcardItem
