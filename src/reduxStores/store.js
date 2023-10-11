import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "../reduxSlices/profileStateSlice";
import signupReducer from "../reduxSlices/signupSlice";
import loginReducer from "../reduxSlices/loginSlice";

export const store = configureStore({
  reducer: {
    //All the reducers are stored here
    profileState: stateReducer,
    login: loginReducer,
    signup: signupReducer,
  },
});
