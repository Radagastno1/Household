import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addUserToDB, signInWithAPI } from "../../api/user";
import { User, UserCreate } from "../../types";

interface UserState {
  user: User | undefined;
  filteredUsers: User[];
  selectedUser: User | null;
}

export const initialState: UserState = {
  filteredUsers: [],
  selectedUser: null,
  user: undefined,
};

export const addUserAsync = createAsyncThunk<
  User,
  UserCreate,
  { rejectValue: string }
>("user/addUser", async (user, thunkAPI) => {
  console.log("INNAN TRY I USER SLICE");
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
    loginUser: (state, action: PayloadAction<UserCreate>) => {
      console.log("Vi kommer hit");
      signInWithAPI(action.payload).then((user) => {
        if (user) {
          state.user = user;
        }
      });
    },

    logOutUser: (state) => {
      state.user = initialState.user;
    },
    setActiveUser: (state, action) => {
      const activeUser: User = { uid: action.payload };
      state.user = activeUser;
    },
  },
});

// export const fetchUsers =
//   (activeHouseholdId: string) => async (dispatch: any, _getState: any) => {
//     const users = await getUsersFromDB(activeHouseholdId);
//     dispatch(userSlice.actions.setUsers(users));
//   };

export const userReducer = userSlice.reducer;
export const { loginUser, logOutUser, setActiveUser } = userSlice.actions;
