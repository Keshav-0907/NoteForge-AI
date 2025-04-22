'use client'
import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { toggleNotesModal } from '@/store/slice/notesSlice';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Separator } from '../ui/separator';
import { Bot, X } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const AddNotesModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        dispatch(toggleNotesModal(false));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div ref={modalRef} className="relative">
        <div className='bg-card text-card-foreground border shadow-sm rounded-xl w-[50vw]'>
          <div className='px-4 py-2 flex justify-between items-center '>
            <div>
              Add New Note
            </div>

            <X size={24} className='hover:bg-accent cursor-pointer p-0.5 rounded-md' onClick={()=>dispatch(toggleNotesModal(false))}/>
          </div>
          <Separator/>


          <div className='p-4 flex flex-col gap-4'>
            <div className='flex gap-2 flex-col'>
              <Label> Title </Label>
              <Input placeholder='Title' className='w-full' />
            </div>
            <div className='flex gap-2 flex-col'>
              <Label> Desciption </Label>
              <Textarea placeholder='Title' className='w-full' />
            </div>

            <div className='flex justify-between'>
              <div className='flex gap-1 items-center'>
                <Bot size={16}/>
                <span className='text-sm text-muted-foreground'> Summary is auto-generated after saving the note. </span>
              </div>
              <Button>
                Save Note
              </Button>
            </div>
          </div>

          <Separator/>
          
        </div>
      </div>
    </div>
  )
}

export default AddNotesModal