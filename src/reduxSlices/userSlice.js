import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
  lang: [],
  focus: "",
  skill: "",
  isAuthenticated: false,
};

export const signup = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setLang: (state, action) => {
      state.lang.push(action.payload);
    },
    setFocus: (state, action) => {
      state.focus = action.payload;
    },
    setSkill: (state, action) => {
      state.skill = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});
export const {
  setUsername,
  setPassword,
  setAuthenticated,
  setLang,
  setFocus,
  setSkill,
} = signup.actions;
export default signup.reducer;
