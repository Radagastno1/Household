import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addUserToDB, getUsersFromDB } from "../../api/user";
import { User } from "../../types";

interface UserState {
  user: any;
  users: User[];
  filteredUsers: User[];
  selectedUser: User | null;
}

export const initialState: UserState = {
  users: [],
  filteredUsers: [],
  selectedUser: null,
  user: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    logOutUser: (state) => {
      state.user = initialState.user;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      addUserToDB(action.payload)
        .then((createdUser) => {
          if (createdUser) {
            state.users = [...state.users, createdUser];
            console.log("Användare som las till: ", action.payload);
            console.log("nu är state användare listan;", state.users);
            console.log(
              "nu är state filtered användare listan;",
              state.filteredUsers,
            );
          }
        })
        .catch((error) => {
          console.error("Fel vid tillägg av uppgift:", error);
        });
    },
  },
});

export const { addUser } = userSlice.actions;

// Asynct Thunk Action (Redux Core)
export const fetchUsers =
  (activeHouseholdId: string) => async (dispatch: any, _getState: any) => {
    const users = await getUsersFromDB(activeHouseholdId);
    dispatch(userSlice.actions.setUsers(users));
  };

export const userReducer = userSlice.reducer;
export const { loginUser, logOutUser, setUsers } = userSlice.actions;
