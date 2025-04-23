
'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { toggleNotesModal, triggerNotesRefetch } from '@/store/slice/notesSlice';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Separator } from '../ui/separator';
import { Bot, Loader2, X } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useMutation } from '@tanstack/react-query'
import OpenAI from "openai";
import { AI_PROMPT } from '@/lib/defaults';
import { supabase } from '@/lib/supabaseClient';
import useAuth from '@/hooks/useAuth';
import toast from 'react-hot-toast';

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.NEXT_PUBLIC_DEEPSEAK_API_KEY,
  dangerouslyAllowBrowser: true,
});


const AddNotesModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { session } = useAuth()
  const [error, setError] = useState({
    title: false,
    content: false,
  })

  const createNote = async () => {
    if (!title || !content) {
      setError({
        title: !title,
        content: !content,
      })
      return
    }

    if (!session?.user) {
      console.warn('User not authenticated')
    }

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: AI_PROMPT.prompt }, { role: "user", content: content }],
      model: "deepseek-chat",
    });
    const summary = completion.choices[0].message.content || '';

    const { data, error } = await supabase.from('notes').insert([
      {
        title,
        content,
        userid: session?.user.id,
        summary,
      },
    ])
  }

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: (data) => {
      console.log('Saved!')
      setTitle('')
      setContent('')
      dispatch(toggleNotesModal(false));
      dispatch(triggerNotesRefetch());
      toast.success('Note saved successfully!')
      setError({
        title: false,
        content: false
      })
    },
    onError: (err) => {
      console.error('Save failed:', err)
    },
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        dispatch(toggleNotesModal(false));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSaveNote = async () => {
    try {
      mutation.mutate()
    } catch (error) {
      console.log('Error saving note:', error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-2">
      <div ref={modalRef} className='bg-card text-card-foreground border shadow-sm rounded-xl md:w-[50vw] max-h-[90vh] w-full relative'>
        <div className='px-4 py-2 flex justify-between items-center '>
          <div>
            Add New Note
          </div>

          <X size={24} className='hover:bg-accent cursor-pointer p-0.5 rounded-md' onClick={() => dispatch(toggleNotesModal(false))} />
        </div>
        <Separator />


        <div className='p-4 flex flex-col gap-4'>
          <div className='flex gap-2 flex-col'>
            <Label> Title </Label>
            <Input placeholder='Title' className='w-full' onChange={(e) => setTitle(e.target.value)} value={title} />
            {error.title && <span className='text-red-500 text-sm'> Title is required </span>}
          </div>
          <div className='flex gap-2 flex-col'>
            <Label> Desciption </Label>
            <Textarea
  placeholder='Description'
  className='w-full min-h-[120px] max-h-[300px] resize-y'
  onChange={(e) => setContent(e.target.value)}
  value={content}
/>            {error.content && <span className='text-red-500 text-sm'> Content is required </span>}
          </div>

          <div className='flex justify-between'>
            <div className='md:flex hidden gap-1 items-center'>
              <Bot size={16} />
              <span className='text-sm text-muted-foreground'> Summary is auto-generated after saving the note. </span>
            </div>
            <Button onClick={handleSaveNote} disabled={mutation.isPending} className='cursor-pointer'>
              {mutation.isPending ? (
                <span className="flex items-center gap-1">
                  <Loader2 className="animate-spin w-4 h-4" /> Saving...
                </span>
              ) : 'Save Note'}
            </Button>

          </div>
        </div>

        <Separator />

      </div>
    </div>
  )
}

export default AddNotesModal
