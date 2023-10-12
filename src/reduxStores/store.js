import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "../reduxSlices/profileStateSlice";
import userReducer from "../reduxSlices/userSlice";
import matchesReducer from "../reduxSlices/matchesSlice";

export const store = configureStore({
  reducer: {
    //All the reducers are stored here
    profileState: stateReducer,
    user: userReducer,
    matches: matchesReducer,
  },
});
