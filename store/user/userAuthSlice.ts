import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";

const initialState: User | null = null;

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      return action.payload; // Set the user to the authenticated user
    },
    logOutUser: (state) => {
      return null; // Clear the user when logging out
    },
  },
});

export const { loginUser, logOutUser } = userAuthSlice.actions;
export default userAuthSlice.reducer;
