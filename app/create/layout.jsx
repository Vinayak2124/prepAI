import React from 'react';
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image';
import {BookOpen,TrendingUp, GraduationCap} from 'lucide-react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export default function CreateDashBoard({children}){
    return ( 
        <>
        <div className="py-3 px-5 shadow-md flex justify-between items-center bg-slate-100">
           <div className="flex gap-2 items-center justify-center ">
  <Image
    className="rounded-full"
    src="/logo2.png"
    alt="logo"
    width={40}
    height={40}
  />
  <h2 className="font-bold text-xl text-blue-900">Prep-AI</h2>
            </div>
            <h2 className="font-medium text-2xl  text-zinc-900 hidden drop-shadow-md animate-pulse md:block  ">
            
                </h2>
                <div className='flex justify-center items-center gap-10'>
                   <Link href={'/dashboard'}><h2 className='hover:text-gray-400 font-semibold text-lg text-blue-800'>Dashboard</h2></Link>
         <UserButton    appearance={{
    elements: {
      avatarBox: "w-8 h-8" 
    }
                    }} />
                </div>
        </div>
        <div>{children}</div>
        </>
    
)
}
