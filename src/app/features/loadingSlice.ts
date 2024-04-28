import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../hooks/store";

interface ILoadingState {
  isLoading: boolean;
  message: string;
}

const initialState: ILoadingState = {
  isLoading: false,
  message: "",
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});
export const selectLoading = (state: RootState) => state.loading;
console.log("selectLoading :", selectLoading);
export const { setLoading, setMessage } = loadingSlice.actions;
export default loadingSlice.reducer;
