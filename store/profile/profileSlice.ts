import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addProfileToDB, getAllProfilesByHouseholdId } from "../../api/profile";
import { profiles } from "../../data";
import { Profile } from "../../types";

interface ProfileState {
  profiles: Profile[];
  activeProfile: Profile | null;
}

export const initialState: ProfileState = {
  profiles: profiles,
  activeProfile: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    //denna ska anropas när man går in i ett hushåll, så man får alla profiler för det hushållet varje gång
    setProfiles: (state, action: PayloadAction<Profile[]>) => {
      state.profiles = action.payload;
    },
    //denna ska sättas när mnan får in i ett hushåll, vilken profil DU ÄR
    setActiveProfile: (state, action: PayloadAction<(householdId:string, userId:string)) => {
      const activeProfile = getProfileByHouseholdAndUser(action.payload).
      then((activeProfile) => {
        if (activeProfile) {
          state.activeProfile = activeProfile;
          console.log("aktiva profilen är: ", activeProfile.name);
        }
      })
      .catch((error) => {
        console.error("Fel vid tillägg av profil:", error);
      });
 
    },
    // editProfileName: (state, action: PayloadAction<Profile>) => {
    //   state.profiles = [...state.profiles, action.payload];
    // },
    addProfile: (state, action: PayloadAction<Profile>) => {
      addProfileToDB(action.payload)
        .then((createdProfile) => {
          if (createdProfile) {
            state.profiles = [...state.profiles, createdProfile];
            console.log("profile som las till: ", action.payload);
          }
        })
        .catch((error) => {
          console.error("Fel vid tillägg av profil:", error);
        });
    },
    editProfileName: (
      state,
      action: PayloadAction<{ profileId: string; newProfileName: string }>,
    ) => {
      const profileToEdit = state.profiles.find(
        (profile) => profile.id === action.payload.profileId,
      );
      if (profileToEdit) {
        profileToEdit.profileName = action.payload.newProfileName;
      }
    },
    setProfileByHouseholdAndUser: (
      state,
      action: PayloadAction<{ userId: string; householdId: string }>,
    ) => {
      const activeProfile = state.profiles.find(
        (p) =>
          p.householdId === action.payload.householdId &&
          p.userId === action.payload.userId,
      );
      if (activeProfile) {
        state.activeProfile = activeProfile;
      }
    },
  },
});

export const fetchAllProfilesByHousehold =
  (activeHouseholdId: string) => async (dispatch: any, getState: any) => {
    const profiles = await getAllProfilesByHouseholdId(activeHouseholdId);
    if (profiles) {
      dispatch(profileSlice.actions.setProfiles(profiles));
    }
  };

export const { setProfiles } = profileSlice.actions;
export const { addProfile } = profileSlice.actions;
export const { editProfileName } = profileSlice.actions;
export const { setProfileByHouseholdAndUser } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
