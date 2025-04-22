'use client'
import NotesCard from "@/components/notes/NotesCard";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RootState } from "@/store/store";
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Dashboard = () => {
  const dispatch = useDispatch()

  const notesState = useSelector((state: RootState) => state);

  console.log("notesState", notesState);


  return (
    <div className='bg-[#121212] h-full w-full p-2 flex flex-col gap-6'>

      {/* <div>
        <Label>
          Pinned Notes
        </Label>
        
        <div>
          0 pinned notes
        </div>

      </div> */}


      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-4 gap-4">
          <NotesCard />
          <NotesCard />
          <NotesCard />
          <NotesCard />
        </div>
      </div>
    </div>
  )
}

export default Dashboard