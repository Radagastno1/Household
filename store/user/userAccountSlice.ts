// import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { User } from "../../types";

// interface UserAccountState {
//   user: User;
// }

// export const initialState: UserAccountState = {
//   user: {
//     uid: "",
//     displayName: "",
//     email: "",
//     password: "",
//   },
// };

// const userAccountSlice = createSlice({
//   name: "userAccount",
//   initialState,
//   reducers: {
//     createAccount: (state, action: PayloadAction<User>) => {
//       // Update the state with the user data from the action
//       state.user = action.payload;
//     },
//   },
// });

// export const { createAccount } = userAccountSlice.actions;
// export const userAccountReducer = userAccountSlice.reducer;
