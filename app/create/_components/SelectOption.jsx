"use client";
import React,{useState} from 'react';
import Image from 'next/image';


const SelectOption = ({selectedStudyType}) => {
    const [selected, setSelected]= useState();
    const Options = [
        {
            name:'Exam',
            icon:'/exam.jpg'
        },
        {
            name:'Job Interview',
            icon:'/job.jpeg'
        },
        {
            name:'Practice',
            icon:'/practice.jpeg'
        },
        {
            name:'Coding Prep',
            icon:'/code.jpg'
        },
        {
            name:'Other',
            icon:'/other.png'
        },

    ]
  return (
    <div >
        <h2 className="text-center mt-10 mb-3 text-2xl font-semibold">
            For which you want to create your Study Material ?
        </h2>
        <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {Options.map((option, index) => (
            <div onClick={() => { setSelected(option.name); selectedStudyType(option.name) }}
           key={index} className={` p-4 mt-5 flex flex-col items-center justify center border rounded-xl rounded-4xl cursor-pointer hover:border-blue-600
        ${option?.name===selected && 'bg-slate-100' }  `}>
            <Image
              src={option.icon}
              alt={option.name}
              width={150}
              height={150}
              
            />
            <p className="mt-4 text-md font-medium ">{option.name}</p>
          </div>
        ))}

            </div>
    </div>
  )
}

export default SelectOption