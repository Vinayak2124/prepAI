import React from 'react';
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image';
import { BookOpen, TrendingUp, GraduationCap } from 'lucide-react'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
export default function DashboardHeader(){
    return ( 
        <div className="p-3 shadow-md flex justify-between items-center bg-slate-100">
           <div className="flex gap-2 items-center justify-center md:hidden">
  <Image
    className="rounded-full"
    src="/logo2.png"
    alt="logo"
    width={40}
    height={40}
  />
  <h2 className="font-bold text-xl">Prep-AI</h2>
            </div>
            <h2 className="font-medium text-xl  text-zinc-900 hidden drop-shadow-md animate-pulse md:block  ">
                <div className='flex justify-center items-center'>
    Learn  <BookOpen className="w-5 h-7 text-blue-600" /> Grow 
      <TrendingUp className="w-5 h-7 text-green-600" />Succeed
                    <GraduationCap className="w-5 h-7 " />
                    </div>
  </h2>
  <div className='flex justify-center items-center gap-10 '>
    <Link href={'/create'}><Button className='hover:text-gray-200 rounded-xl hover:bg-blue-800 hover:scale-95 font-semibold text-lg bg-blue-700 md:hidden'>+ Create</Button></Link>
         <UserButton    appearance={{
    elements: {
      avatarBox: "w-8 h-8"  
    }
                    }} />
                </div>
        </div>
    
)
}
