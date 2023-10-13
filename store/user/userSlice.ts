import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";

interface UserState {
  user: User;
}

export const initialState: UserState = {
  user: {
    id: "",
    name: "",
    username: "",
    password: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logOutUser: (state) => {
      //återställer till intial tillståndet, alltså tomma egenskaper sålänge bara
      state.user = initialState.user;
    },
  },
});

export const { loginUser, logOutUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
