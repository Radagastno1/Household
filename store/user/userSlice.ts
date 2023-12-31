import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addUserToDB, signInWithAPI } from "../../api/user";
import { User, UserCreate } from "../../types";

interface UserState {
  user: User | undefined;
  filteredUsers: User[];
  selectedUser: User | null;
  error: string | null;
}

export const initialState: UserState = {
  filteredUsers: [],
  selectedUser: null,
  user: undefined,
  error: null,
};

export const addUserAsync = createAsyncThunk<
  User,
  UserCreate,
  { rejectValue: string }
>("user/addUser", async (user, thunkAPI) => {
  try {
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

export const logInUserAsync = createAsyncThunk<
  User,
  UserCreate,
  { rejectValue: string }
>("user/logInUser", async (user, thunkAPI) => {
  try {
    const response = await signInWithAPI(user);
    return response;
  } catch (error) {
    throw new Error("Användarnamn eller lösenord var felaktigt.");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOutUser: (state) => {
      state.user = undefined;
    },
    setActiveUser: (state, action: PayloadAction<User | undefined>) => {
      if (action.payload) {
        state.user = {
          uid: action.payload.uid,
          email: action.payload.email,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInUserAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = {
            uid: action.payload.uid,
            email: action.payload.email,
          };
          state.error = null;
        }
      })
      .addCase(logInUserAsync.rejected, (state, action) => {
        state.error = "Användarnamn eller lösenord är felaktigt.";
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.error = null;
      })
      .addCase(addUserAsync.rejected, (state, action) => {
        state.error = "Det verkar som att du redan har ett konto här.";
      });
  },
});

export const userReducer = userSlice.reducer;
export const { logOutUser, setActiveUser } = userSlice.actions;
