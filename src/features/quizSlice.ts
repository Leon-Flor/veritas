import { RootState } from "@/hooks/store";
import { createSlice } from "@reduxjs/toolkit";
import type { IParticipant } from "@/types/User";

const initialState: IParticipant = {
  id: 0,
  name: "",
  score: 0,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setParticipant: (state, action) => {
      state = action.payload;
    },

    setScore: (state, action) => {
      state.score = action.payload;
    },

    newParticipant: (state, action) => {
      state = action.payload;
    },
  },
});
export const selectParticipant = (state: RootState) => state.quiz;
export const { setParticipant, setScore, newParticipant } = quizSlice.actions;
export default quizSlice.reducer;
