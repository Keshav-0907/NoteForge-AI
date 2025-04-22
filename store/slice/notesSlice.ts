import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Note {
  isNotesModalOpen: boolean;
}

const initialState = {
  isNotesModalOpen: false,
}
  
const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    toggleNotesModal: (state, action: PayloadAction<boolean>) => {
      state.isNotesModalOpen = action.payload;
    },
  },
});

export const { toggleNotesModal } = notesSlice.actions;
export default notesSlice.reducer;