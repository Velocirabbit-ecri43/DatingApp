import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  matches: [],
};

export const matches = createSlice({
  name: "matches",
  initialState,
  reducers: {
    updateMatches: (state, action) => {
      state.matches = action.payload;
    },
  },
});
export const { updateMatches } = matches.actions;
export default matches.reducer;
