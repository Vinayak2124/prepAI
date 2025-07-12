"use client";

import Image from 'next/image';
import React, { useContext } from 'react';
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Shield, HomeIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import {Progress } from "@/components/ui/progress"
import Link from "next/link";
import { CourseCountContext } from '@/app/_context/CourseCountContext';
import { UserButton } from '@clerk/nextjs';
export default function SideBar() {
  const {totalCourse,setTotalCourse} = useContext(CourseCountContext)
  const MenuList = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
    },
    {
      name: 'Upgrade',
      icon: Shield,
      path: '/dashboard/upgrade',
    },
    {
      name: 'Home',
      icon: HomeIcon,
      path:'/',
    },
    
  ];

    const path = usePathname();
  return (
    <div className="relative h-screen shadow-md p-5 mt-3">
      <div className="flex gap-2 items-center justify-center">
        <Image
          className="rounded-full"
          src={'/logo2.png'}
          alt="logo"
          width={40}
          height={40}
        />
        <h2 className="font-bold text-2xl text-blue-900">Prep-AI</h2>
      </div>

      <div className="mt-10">
        <Button className="w-full bg-blue-800 text-white hover:bg-blue-700">
         <Link href={'/create'}> +  Create New </Link>
        </Button>

        <div className="mt-5">
          {MenuList.map((menu, index) => (
            <Link href={menu.path} key={index}>
              <div  className={`flex items-center gap-5 p-3 mt-3 hover:bg-slate-200 rounded-lg cursor-pointer ${path === menu.path ? 'bg-slate-200' : ''}`}
            >
              <menu.icon className="w-5 h-5" />
              <h2>{menu.name}</h2>
              </div></Link> 
            
          ))}
       
        </div>
      </div>

      <div className="border p-3 bg-slate:100 rounded-lg absolute bottom-10 w-[90%]">
   <h2 className="text-lg mb-2"> Available Credits : {10 - totalCourse} </h2>
   <Progress  value={(totalCourse/10)*100} />
   <h2 className="text-sm">{totalCourse} out of 10 credits Used </h2>

   <Link href={'/dashboard/upgrade'} className="text-primary text-xs mt-3">Upgrade to create more</Link>
      </div>
    </div>
  );
}
