import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Separator } from '../ui/separator'
import { Bot, EllipsisVertical } from 'lucide-react'
import { Label } from '../ui/label'

const NotesCard = () => {
  return (
    <div className='bg-card text-card-foreground border shadow-sm rounded-md p-2'>
      <div className='flex flex-col gap-2'>
        <Label>Benefits of Morning Walk</Label>
        <Separator />
        <div className='bg-secondary border-[1px] border-primary/40 px-2 text-sm rounded-md flex flex-col gap-2 py-2'>
          <div className='text-xs flex gap-1 text-gray-400'> <Bot size={16} /> AI Generated Summary </div>
          <div className='text-lg'>
            Morning walks boost heart health, mood, focus, and sleep quality.
          </div>
        </div>
        <Separator />
      </div>
      <div className='px-2 flex justify-between items-center pt-1'>
        <Label className='text-sm'> 21st Sept 2025 </Label>
        <EllipsisVertical size={20} className='hover:bg-accent px-0.5 rounded-sm cursor-pointer' />
      </div>
    </div>
  )
}

export default NotesCard