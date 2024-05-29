import { RootState } from "@/hooks/store";
import { createSlice } from "@reduxjs/toolkit";
import type { IParticipant } from "@/types/User";

const initialState: IParticipant = {
  id: 0,
  name: "",
  answersFailed: [],
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
    resetParticipant: (state) => {
      state.id = 0;
      state.name = "";
      state.score = 0;
      state.answersFailed = [];
    },

    newParticipant: (state, action) => {
      state = action.payload;
    },
    setAnswersFailed: (state, action) => {
      state.answersFailed = state.answersFailed.concat(action.payload);
    },
  },
});
export const selectParticipant = (state: RootState) => state.quiz;
export const {
  setParticipant,
  setScore,
  newParticipant,
  setAnswersFailed,
  resetParticipant,
} = quizSlice.actions;
export default quizSlice.reducer;
