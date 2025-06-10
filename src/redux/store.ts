import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

// Holds the entire app state in one object.
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// (Helps with typed useSelector and useDispatch hooks.)
