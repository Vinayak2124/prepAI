import React from 'react';
import WelcomeBanner from "./_components/WelcomeBanner.jsx"
import CourseList from './_components/CourseList.jsx';
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