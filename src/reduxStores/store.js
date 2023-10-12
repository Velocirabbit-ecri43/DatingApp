import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "../reduxSlices/profileStateSlice";
import signupReducer from "../reduxSlices/userSlice";
import loginReducer from "../reduxSlices/loginSlice";
import matchesReducer from "../reduxSlices/matchesSlice";

export const store = configureStore({
  reducer: {
    //All the reducers are stored here
    profileState: stateReducer,
    login: loginReducer,
    signup: signupReducer,
    matches: matchesReducer,
  },
});
