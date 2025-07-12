import React from 'react'
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

function CourseViewlayout({children}) {
  return (
      <div>
          <div className='flex justify-between items-center w-full py-3 px-5 shadow-md  bg-slate-100'>
         <div className="flex gap-2 items-center justify-between ">
           <Image
             className="rounded-full"
             src="/logo2.png"
             alt="logo"
             width={40}
             height={40}
           />
           <h2 className="font-bold text-xl text-blue-900">Prep-AI</h2>
                     </div>
                     <div className='flex justify-center items-center gap-10'>
          <Link href={'/dashboard'}><h2 className='hover:text-gray-400 font-semibold text-lg text-blue-800'>Dashboard</h2></Link>
          <Link href={'/create'}><h2 className='hover:text-gray-400 font-semibold text-lg text-blue-800'>Create</h2></Link>
         <UserButton    appearance={{
    elements: {
      avatarBox: "w-8 h-8" 
    }
                    }} />
                </div>
              </div>
          <div className='mx-10 md:mx-36 lg:px-44 mt-10'>
              {children}
          </div>
    </div>
  )
}

export default CourseViewlayout;