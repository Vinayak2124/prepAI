import React from 'react';
import WelcomeBanner from "./_components/WelcomeBanner.jsx"
import CourseList from './_components/CourseList.jsx';

export const dynamic = "force-dynamic";
const page = ()=>{
    return (
        <>
            <div>
                <WelcomeBanner />
                <CourseList/>
            </div>
            
        </>
    )
}
export default page;