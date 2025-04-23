'use client'
import React from 'react'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from 'react-redux';
import AddNotesModal from '../notes/AddNotesModal';
import { toggleNotesModal } from '@/store/slice/notesSlice';
import useAuth from '@/hooks/useAuth';

const Sidebar = () => {
  const dispatch = useDispatch()
  const {logOut} = useAuth()


  return (
    <div className='min-w-52 bg-[#121212] h-full border-r flex flex-col justify-between py-4 px-4'>
      <Button className='w-full cursor-pointer' onClick={() => dispatch(toggleNotesModal(true))}>
        <Plus />
        Add Note
      </Button>



      <Button variant={'outline'} className='w-full cursor-pointer' onClick={logOut}>
        Log Out
      </Button>


     
    </div>
  )
}

export default Sidebar