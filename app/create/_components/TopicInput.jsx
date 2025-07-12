import React from 'react'
import { Textarea } from "@/components/ui/textarea.jsx"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

const TopicInput = ({setTopic,setDiffcultyLevel}) => {
  return (
    <div className='mt-10 w-full flex flex-col'>
        <h2>Enter the Topic or Paste the content for which you want to generate the study material.! </h2>
          <Textarea placeholder="Enter your topic here" className="mt-2" onChange={ (e)=>setTopic(e.target.value)} />
          <h2 className='mt-5 mb-3'>Select the Difficulty level </h2>
          <Select onValueChange={(value)=>setDiffcultyLevel(value)}>
        <SelectTrigger className="w-full">
            <SelectValue placeholder="Difficulty Level" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Moderate">Moderate</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
        </SelectContent>
        </Select>
    </div>
  )
}

export default TopicInput