import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Profile } from "../../types";
import { profiles } from "../../data";

interface ProfileState {
  profiles: Profile[];
  activeProfile: Profile | null;
}

export const initialState: ProfileState = {
  profiles: profiles,
  activeProfile: null
};



const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profiles = [...state.profiles, action.payload];
    },
    editProfileName: (state, action: PayloadAction<Profile>) => {
      state.profiles = [...state.profiles, action.payload];
    },
    setProfileByHouseholdAndUser:(state, action:PayloadAction<{userId:string, householdId:string}>) => {
      const activeProfile = state.profiles.find(p => p.householdId === action.payload.householdId && p.userId === action.payload.userId)
      if (activeProfile) {
        state.activeProfile = activeProfile;
      }
    },
   
  },
});



export const { setProfile } = profileSlice.actions;
export const { editProfileName } = profileSlice.actions;
export const { setProfileByHouseholdAndUser } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
