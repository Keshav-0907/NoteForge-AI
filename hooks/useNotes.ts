'use client'
import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import useAuth from './useAuth'
import { useDispatch, useSelector } from 'react-redux'
import { triggerNotesRefetch } from '@/store/slice/notesSlice'

const useNotes = () => {
    const [notes, setNotes] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const { session } = useAuth()
    const state = useSelector((state: any) => state.notes)
    const dispatch = useDispatch()

    const getNotes = async () => {
        setLoading(true)
        if (!session?.user) {
            console.warn('User not authenticated')
            return null
        }

        const { data, error } = await supabase
            .from('notes')
            .select('*')
            .eq('userid', session.user.id)

        if (error) {
            console.error('Error fetching notes:', error)
            setLoading(false)
            return null
        }

        if (data) {
            setNotes(data)
            setLoading(false)
            return data
        }

        setLoading(false)
        return null
    }

    useEffect(() => {
        if (session?.user) {
            console.log('Fetching notes')
            getNotes()
        }
    }, [session?.user, state.shouldRefetchNotes])


    return {
        notes,
        loading,
    }
}

export default useNotes
