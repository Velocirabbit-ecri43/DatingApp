import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reduxSlices/loginSlice";

export const loginStore = configureStore({
  reducer: {
    login: loginReducer,
  },
});
