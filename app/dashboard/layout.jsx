"use client"
import React,{useState} from 'react';
import SideBar from './_components/SideBar.jsx';
import DashboardHeader from './_components/DashboardHeader.jsx';
import { CourseCountContext } from '../_context/CourseCountContext.jsx';
export default function DashboardLayout({ children }) {
    const [totalCourse,setTotalCourse] = useState(0)
    return (
        <CourseCountContext.Provider value={{totalCourse,setTotalCourse}}>
        <div >
            <div className='md:w-64 hidden md:block fixed'>
                <SideBar/>
            </div>
            <div className="md:ml-64">
                <DashboardHeader/>
                <div className="p-10">
                    {children}
                </div>
            </div>
            
            </div>
            </CourseCountContext.Provider>
    )
}