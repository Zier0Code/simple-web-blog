import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { logoutUser } from "../api/database";

interface AuthState {
  user: unknown | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      logoutUser();
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
