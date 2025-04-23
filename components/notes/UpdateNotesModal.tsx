'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleUpdateNotesModal, triggerNotesRefetch } from '@/store/slice/notesSlice'
import { Separator } from '../ui/separator'
import { Bot, Loader2, X } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { RootState } from '@/store/store'
import { supabase } from '@/lib/supabaseClient'
import { useMutation } from '@tanstack/react-query'
import useAuth from '@/hooks/useAuth'
import OpenAI from "openai"
import { AI_PROMPT } from '@/lib/defaults'
import toast from 'react-hot-toast'

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.NEXT_PUBLIC_DEEPSEAK_API_KEY!,
    dangerouslyAllowBrowser: true,
})

const UpdateNotesModal = () => {
    const modalRef = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch()
    const { session } = useAuth()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [summary, setSummary] = useState('')
    const [loading, setLoading] = useState(false)

    const activeNoteId = useSelector((state: RootState) => state.notes.updateNotesModalOpen)

    useEffect(() => {
        const fetchNote = async () => {
            const { data, error } = await supabase.from('notes').select('*').eq('id', activeNoteId).single()
            if (data) {
                setTitle(data.title)
                setContent(data.content)
                setSummary(data.summary)
            }
        }

        if (activeNoteId) fetchNote()
    }, [activeNoteId])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                dispatch(toggleUpdateNotesModal(null))
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [dispatch])

    const mutation = useMutation({
        mutationFn: async () => {
            setLoading(true)
            const completion = await openai.chat.completions.create({
                messages: [
                    { role: 'system', content: AI_PROMPT.prompt },
                    { role: 'user', content },
                ],
                model: 'deepseek-chat',
            })

            const newSummary = completion.choices[0].message.content || ''
            setSummary(newSummary)

            const { error } = await supabase
                .from('notes')
                .update({ title, content, summary: newSummary, updated_at: new Date().toISOString() })
                .eq('id', activeNoteId)
                .eq('userid', session?.user.id)

            if (error) throw new Error(error.message)

            setLoading(false)
            dispatch(toggleUpdateNotesModal(null))
        },
        onSuccess: () => {
            toast.success('Note updated successfully!')
            dispatch(triggerNotesRefetch())
        },
        onError: (error: any) => {
            toast.error(`Error updating note: ${error.message}`)
            setLoading(false)
        },
    })

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-2">
            <div ref={modalRef} className="relative bg-card text-card-foreground border shadow-sm rounded-xl md:w-[50vw]">
                <div className="px-4 py-2 flex justify-between items-center">
                    <div>Update Note</div>
                    <X size={24} className="hover:bg-accent cursor-pointer p-0.5 rounded-md" onClick={() => dispatch(toggleUpdateNotesModal(null))} />
                </div>
                <Separator />
                <div className="p-4 flex flex-col gap-4">
                    <div className="flex gap-2 flex-col">
                        <Label>Title</Label>
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                    </div>
                    <div className="text-sm bg-accent p-2 rounded-md flex flex-col gap-2 border border-primary">
                        <div className="flex items-center gap-1">
                            <Bot size={16} />
                            <span className="text-muted-foreground text-sm">AI Generated Summary</span>
                        </div>
                        <div className="font-semibold text-lg">{summary}</div>
                    </div>
                    <div className="flex gap-2 flex-col">
                        <Label>Description</Label>
                        <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
                    </div>
                    <div className="flex md:justify-between justify-end items-center">
                        <div className="gap-1 items-center md:flex hidden">
                            <Bot size={16} />
                            <span className="text-sm text-muted-foreground">Summary is auto-generated after saving.</span>
                        </div>
                        <Button onClick={() => mutation.mutate()} disabled={loading}>
                            {mutation.isPending ? (
                                <span className="flex items-center gap-1">
                                    <Loader2 className="animate-spin w-4 h-4" /> Updating...
                                </span>
                            ) : 'Update Note'}
                        </Button>
                    </div>
                </div>
                <Separator />
            </div>
        </div>
    )
}

export default UpdateNotesModal
