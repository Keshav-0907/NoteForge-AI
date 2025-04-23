'use client'
import AddNotesModal from "@/components/notes/AddNotesModal";
import NotesCard from "@/components/notes/NotesCard";
import UpdateNotesModal from "@/components/notes/UpdateNotesModal";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import useNotes from "@/hooks/useNotes";
import { toggleNotesModal } from "@/store/slice/notesSlice";
import { RootState } from "@/store/store";
import { Plus } from "lucide-react";
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Dashboard = () => {
  const { notes, loading } = useNotes()
  const dispatch = useDispatch()

  const showUpdateModal = useSelector((state: RootState) => state.notes.updateNotesModalOpen);
  const notesState = useSelector((state: RootState) => state.notes);

  const pinnedNotes = notes?.filter((note) => note.isPinned);

  const normalNotes = notes?.filter((note) => !note.isPinned && !note.isArchived);

  console.log("Pinned Notes: ", pinnedNotes);




  return (
    <div className='bg-[#121212] h-full w-full p-2 flex flex-col gap-6 relative'>

      {
        pinnedNotes?.length > 0 && (
          <div className="flex flex-col gap-4">
            <Label className="text-md font-semibold"> Pinned Notes</Label>
            <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
              {loading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="p-4 bg-muted rounded-lg space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                ))
              ) : pinnedNotes?.length > 0 ? (
                pinnedNotes.map((note) => (
                  <NotesCard key={note.id} note={note} isPinned={true} />
                ))
              ) : (
                <div className="col-span-4 flex flex-col items-center justify-center">
                  <Label className="text-lg font-semibold">No pinned notes found</Label>
                  <Separator className="my-2 w-1/2" />
                  <Label className="text-sm text-gray-500">Pin your favorite notes</Label>
                </div>
              )}
            </div>
            <Separator />
          </div>
        )
      }

      {
        notes?.length > 0 ? (
          <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))
            ) : normalNotes?.length > 0 ? (
              normalNotes.map((note) => (
                <div className="flex flex-col gap-4" key={note.id}>
                  <Label className="text-md font-semibold">All Notes</Label>
                  <NotesCard key={note.id} note={note} isPinned={false} />
                </div>
              ))
            ) : (
              null
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <Label className="text-lg font-semibold">No notes found</Label>
            <Separator className="my-2 w-1/2" />
            <Label className="text-sm text-gray-500">Create your first note</Label>
          </div>
        )
      }


      {
        showUpdateModal && (
          <UpdateNotesModal />
        )
      }

      {
        notesState.isNotesModalOpen
        && (
          <AddNotesModal />
        )
      }

      <div onClick={() => dispatch(toggleNotesModal(true))} className="bg-primary gap-2 p-4 w-fit rounded-full flex items-center justify-center absolute bottom-4 right-4 cursor-pointer hover:bg-accent transition-all duration-200 ease-in-out">
        <Plus size={20} />
      </div>
    </div>
  )
}

export default Dashboard