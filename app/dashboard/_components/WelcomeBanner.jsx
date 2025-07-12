"use client";
import React from 'react';
import Image from 'next/image';
import {useUser} from '@clerk/nextjs';

function WelcomeBanner(){
    const {user} = useUser();
    return(
        <div className="py-5 px-20 bg-blue-500 w-full text-white rounded-lg flex items-center  justify-between">
        <div>
            <h2 className="font-bold text-4xl mb-2">Hello, {user?.fullName} 👋</h2>
            <p className="text-slate-200">Welcome Back, Its time to get back and start learning new course 😊✨ </p>
        </div>
        <Image src={'/dashboardlogo.png'} alt="logo" width={100} height={100}  />
        </div>
    )
}
export default WelcomeBanner;