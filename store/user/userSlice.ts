import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

export const addUserAsync = createAsyncThunk<
  User,
  User,
  { rejectValue: string }
>("user/addUser", async (user, thunkAPI) => {
  console.log("INNAN TRY I USER SLICE")
  try {
    console.log("inne i try i user slice ");
    const addedUser = await addUserToDB(user);
    if (addedUser) {
      return addedUser;
    } else {
      return thunkAPI.rejectWithValue("failed to add user");
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      console.log("Vi kommer hit");
      state.user = action.payload;
    },

    logOutUser: (state) => {
      state.user = initialState.user;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUserAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.users = [...state.users, action.payload];
        }
      })
      .addCase(addUserAsync.rejected, (state, action) => {
        console.log("error vid add user: ", action.payload);
      });
  },
});

export const fetchUsers =
  (activeHouseholdId: string) => async (dispatch: any, _getState: any) => {
    const users = await getUsersFromDB(activeHouseholdId);
    dispatch(userSlice.actions.setUsers(users));
  };

export const userReducer = userSlice.reducer;
export const { loginUser, logOutUser, setUsers } = userSlice.actions;
