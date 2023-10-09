import { configureStore } from '@reduxjs/toolkit';
import stateReducer from '../features/profileState/profileStateSlice';

export const store = configureStore({
  reducer: {
    updateState: stateReducer,
    // setUsername: stateReducer,
    // setPassword: stateReducer,
    // setAuthenticated: stateReducer,
  },
});
ori