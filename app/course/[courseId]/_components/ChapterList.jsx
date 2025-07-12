import React from 'react'

const ChapterList = ({ course }) => {
    
    const CHAPTERS = course?.data?.result?.courseLayout?.Chapters;
  return (
      <div className='mt-5 '>
          <h2 className='font-semibold text-xl'>Chapters : </h2>

          <div className='mt-4'>
              {
                  CHAPTERS?.map((chapter, index) => (
                      <div key={index} className='flex gap-5 p-5 border shadow-lg mb-4 rounded-xl cursor-pointer bg-slate-100 hover:bg-slate-100 animate-in'>
                          <div >
                          <h2 className="font-semibold text-lg">{ index +1}. {chapter?.ChapterTitle}</h2>
                              <p className="text-gray-600 mt-1">{chapter?.ChapterDescription}</p>
                              </div>
                      </div>
                  ))
              }
          </div>
    </div>
  )
}

export default ChapterList