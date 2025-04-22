'use client'
import React from 'react'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from 'react-redux';
import AddNotesModal from '../notes/AddNotesModal';
import { toggleNotesModal } from '@/store/slice/notesSlice';

const Sidebar = () => {
  const notesState = useSelector((state: RootState) => state.notes);
  const dispatch = useDispatch()


  return (
    <div className='min-w-52 bg-[#121212] h-full border-r flex justify-center py-2 px-4'>
      <Button className='w-full cursor-pointer' onClick={() => dispatch(toggleNotesModal(true))}>
        <Plus />
        Add Note
      </Button>


      {
        notesState.isNotesModalOpen
        && (
          <AddNotesModal />
        )
      }
    </div>
  )
}

export default Sidebar