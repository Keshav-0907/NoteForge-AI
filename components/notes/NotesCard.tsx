import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Separator } from '../ui/separator'
import { Archive, Bot, CircleFadingArrowUp, EllipsisVertical, Pin, Trash } from 'lucide-react'
import { Label } from '../ui/label'
import { formatDate } from '@/lib/helperFunctions'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useNotes from '@/hooks/useNotes'
import { useDispatch } from 'react-redux'
import { toggleNotesModal, triggerNotesRefetch, toggleUpdateNotesModal } from '@/store/slice/notesSlice'
import useAuth from '@/hooks/useAuth'
import { supabase } from '@/lib/supabaseClient'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'


interface Note {
  id: string
  title: string
  content: string
  summary: string
  userid: string
  created_at: string
  updated_at: string;
  isPinned: boolean;
  isArchived: boolean
}

const NotesCard = ({ note, isPinned }: { note: Note, isPinned: boolean}) => {
  const { session } = useAuth()

  const dispatch = useDispatch()


  const deleteNote = async (noteId: string) => {
    const { data, error } = await supabase
      .from('notes')
      .delete()
      .eq('id', noteId)
      .eq('userid', session?.user.id)

    if (error) throw new Error(error.message)
    return data
  }

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: (data) => {
      console.log('Note deleted successfully:', data)
      dispatch(triggerNotesRefetch())
      toast.success('Note deleted successfully')
    }
  })

  const pinNote = async (noteId: string) => {
    const { data, error } = await supabase.from('notes')
      .update({ isPinned: note.isPinned ? false : true })
      .eq('id', noteId)
      .eq('userid', session?.user.id)
    if (error) throw new Error(error.message)
    return data
  }

  const pinMutation = useMutation({
    mutationFn: pinNote,
    onSuccess: (data) => {
      console.log('Note pinned successfully:', data)
      dispatch(triggerNotesRefetch())
      note.isPinned ? toast.success('Note unpinned successfully') : toast.success('Note pinned successfully')
    }
  })

  const handleDelete = () => {
    deleteMutation.mutate(note.id)
  }

  return (
    <div className='bg-card text-card-foreground border shadow-sm rounded-md p-2'>
      <div className='flex flex-col gap-2'>
        <Label>{note.title}</Label>
        <Separator />
        <div className={`bg-secondary border-[1px] ${isPinned ? 'border-primary/40' : 'border-accent'} px-2 text-sm rounded-md flex flex-col gap-2 py-2`}>
          <div className='text-xs flex gap-1 text-gray-400'> <Bot size={16} /> AI Generated Summary </div>
          <div className='text-base font-semibold'>
            {note.summary ? note.summary : 'No summary available'}
          </div>
        </div>
        <Separator />
      </div>
      <div className='px-2 flex justify-between items-center pt-1'>
        <Label className='text-sm'> {formatDate(note.created_at)} </Label>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical size={20} className='hover:bg-accent px-0.5 rounded-sm cursor-pointer' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className='cursor-pointer'
              onClick={() => pinMutation.mutate(note.id)}
            >
              <Pin size={16} className='mr-2' /> {note.isPinned ? 'Unpin' : 'Pin'}
            </DropdownMenuItem>            
            {/* <DropdownMenuItem className='cursor-pointer'> <Archive size={16} className='mr-2' /> Archive </DropdownMenuItem> */}
            <DropdownMenuItem className='cursor-pointer' onClick={() => dispatch(toggleUpdateNotesModal(note.id))}>
              <CircleFadingArrowUp size={16} className='mr-2' />
              Update
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer' onClick={handleDelete}>
              <Trash size={16} className='mr-2' />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default NotesCard