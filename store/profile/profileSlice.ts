import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Profile } from "../../types";

interface ProfileState {
  profile: Profile;
}

export const initialState: ProfileState = {
  profile: {
    id: "",
    profileName: "",
    userId: "",
    householdId: "",
    avatar: "",
    isOwner: false,
    isActive: false,
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
    },
    
  },
});

export const { setProfile } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
