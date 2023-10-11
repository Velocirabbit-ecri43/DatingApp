import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "../reduxSlices/profileStateSlice";

export const store = configureStore({
  reducer: {
    //All the reducers are stored here
    profileState: stateReducer,
  },
});
