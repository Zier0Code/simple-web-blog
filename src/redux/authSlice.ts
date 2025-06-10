import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { logoutUser } from "../api/database";

// Define the shape of the authentication state
interface AuthState {
  user: unknown | null;
}

// Initial state for authentication (no user logged in)
const initialState: AuthState = {
  user: null,
};

// Create the authentication slice for Redux
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to log in a user and store user data in state
    login: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload;
    },
    // Action to log out a user, clear state, and call API logout
    logout: (state) => {
      state.user = null;
      logoutUser(); // Call API to handle backend logout
    },
  },
});

// Export actions for use in components
export const { login, logout } = authSlice.actions;

// Export reducer to be included in the Redux store
export default authSlice.reducer;
