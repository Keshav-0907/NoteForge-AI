import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotesState {
  isNotesModalOpen: boolean;
  shouldRefetchNotes: boolean;
  updateNotesModalOpen: string | null; 
}

const initialState: NotesState = {
  isNotesModalOpen: false,
  shouldRefetchNotes: false,
  updateNotesModalOpen: null,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    toggleNotesModal: (state, action: PayloadAction<boolean>) => {
      state.isNotesModalOpen = action.payload;
    },
    triggerNotesRefetch: (state) => {
      state.shouldRefetchNotes = !state.shouldRefetchNotes;
    },
    toggleUpdateNotesModal: (state, action: PayloadAction<string | null>) => {
      state.updateNotesModalOpen = action.payload;
    },
  },
});

export const { toggleNotesModal, triggerNotesRefetch, toggleUpdateNotesModal } = notesSlice.actions;
export default notesSlice.reducer;
