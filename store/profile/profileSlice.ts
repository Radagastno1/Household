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
    // editProfileName: (state, action: PayloadAction<Profile>) => {
    //   state.profiles = [...state.profiles, action.payload];
    // },
    editProfileName: (state, action: PayloadAction<{ profileId: string, newProfileName: string }>) => {
      const profileToEdit = state.profiles.find(profile => profile.id === action.payload.profileId);
      if (profileToEdit) {
        profileToEdit.profileName = action.payload.newProfileName;
      }
    },
    setProfileByHouseholdAndUser:(state, action:PayloadAction<{userId:string, householdId:string}>) => {
      const activeProfile = state.profiles.find(p => p.householdId === action.payload.householdId && p.userId === action.payload.userId)
      if (activeProfile) {
        state.activeProfile = activeProfile;
      }
    },

    editAvatarSelection: (state, action: PayloadAction<{ userId: string, avatar: string }>) => {
      const userProfiles = state.profiles.filter(profile => profile.userId === action.payload.userId);
      for (const profile of userProfiles) {
        if (profile.avatar === action.payload.avatar) {
          // Avatar redan vald av användaren
          return;
        }
      }
    
      const profileToEdit = userProfiles.find(profile => profile.userId === action.payload.userId);
      if (profileToEdit) {
        profileToEdit.avatar = action.payload.avatar;
      }
    }
   
  },
});



export const { setProfile } = profileSlice.actions;
export const { editProfileName } = profileSlice.actions;
export const { setProfileByHouseholdAndUser } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
