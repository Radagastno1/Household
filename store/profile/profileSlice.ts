import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHouseholdsFromDB } from "../../api/household";
import {
  addProfileToDB,
  getAllProfilesByHouseholdId,
  getAllProfilesByUserIdFromDb,
  saveProfileNameToDatabase,
} from "../../api/profile";
import { Profile } from "../../types";

interface ProfileState {
  profiles: Profile[];
  activeProfile: Profile | null;
}

export const initialState: ProfileState = {
  profiles: [],
  activeProfile: null,
};

export const getProfilesByUserIdAsync = createAsyncThunk<
  Profile[],
  string,
  { rejectValue: string }
>("profiles/getProfilesByUserId", async (userId, thunkAPI) => {
  try {
    console.log("inne i try i thunken, userid är: ", userId);
    const fetchedProfiles = await getAllProfilesByUserIdFromDb(userId);
    if (fetchedProfiles) {
      console.log("inne i try i thunken, profiles är: ", fetchedProfiles);

      return fetchedProfiles;
    } else {
      return thunkAPI.rejectWithValue("failed to add completion");
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    //denna ska anropas när man går in i ett hushåll, så man får alla profiler för det hushållet varje gång
    setProfiles: (state, action: PayloadAction<Profile[] | undefined>) => {
      if (action.payload) {
        state.profiles = action.payload;
      }
    },
    //denna ska sättas när mnan får in i ett hushåll, vilken profil DU ÄR
    setActiveProfile: (state, action: PayloadAction<Profile>) => {
      state.activeProfile = action.payload;
    },
    getProfilesByHouseholdId: (state, action: PayloadAction<string>) => {
      getAllProfilesByHouseholdId(action.payload).then((profiles) => {
        if (profiles) {
          return profiles;
        } else {
          return null;
        }
      });
    },
    // editProfileName: (state, action: PayloadAction<Profile>) => {
    //   state.profiles = [...state.profiles, action.payload];
    // },
    addProfile: (state, action: PayloadAction<Profile>) => {
      const profileToAdd = action.payload;
      getAllProfilesByHouseholdId(action.payload.householdId)
        .then((otherProfilesOnHousehold) => {
          if (otherProfilesOnHousehold && otherProfilesOnHousehold.length > 0) {
            profileToAdd.isOwner = false;
          } else {
            profileToAdd.isOwner = true;
          }
          return addProfileToDB(profileToAdd);
        })
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

    // editProfileName: (
    //   state,
    //   action: PayloadAction<{ profileId: string; newProfileName: string }>,
    // ) => {
    //   const profileToEdit = state.profiles.find(
    //     (profile) => profile.id === action.payload.profileId,
    //   );
    //   if (profileToEdit) {
    //     profileToEdit.profileName = action.payload.newProfileName;
    //   }
    // },
    editProfileName: (
      state,
      action: PayloadAction<{ profileId: string; newProfileName: string }>,
    ) => {
      const profileToEdit = state.profiles.find(
        (profile) => profile.id === action.payload.profileId,
      );
      if (profileToEdit) {
        profileToEdit.profileName = action.payload.newProfileName;
        saveProfileNameToDatabase(
          profileToEdit.id,
          action.payload.newProfileName,
        )
          .then((response) => {
            if (response.success) {
              console.log("Profilnamnet har sparats i databasen.");
            } else {
              console.error("Fel vid spara profilnamnet i databasen.");
            }
          })
          .catch((error) => {
            console.error("Fel vid spara profilnamnet i databasen:", error);
          });
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
  extraReducers: (builder) => {
    builder
      .addCase(getProfilesByUserIdAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.profiles = action.payload;
        }
      })
      .addCase(getProfilesByUserIdAsync.rejected, (state, action) => {
        console.log("error vid get profiles: ", action.payload);
      });
  },
});

export const fetchAllProfilesByHousehold =
  (activeHouseholdId: string, userId: string) =>
  async (dispatch: any, getState: any) => {
    console.log("FETCH ALL PROFILE KÖRS!!!!");
    const profiles = await getAllProfilesByHouseholdId(activeHouseholdId);
    console.log("antal profiler för hushållet:", profiles?.length);
    if (profiles) {
      dispatch(profileSlice.actions.setProfiles(profiles));
      console.log("USER ID SOM KOMMER IN: ", userId);
      const activeProfile = profiles.find(
        (p) => p.householdId === activeHouseholdId && p.userId === userId,
      );
      if (activeProfile) {
        dispatch(profileSlice.actions.setActiveProfile(activeProfile));
        console.log("aktiva profilen: ", activeProfile);
      }
    }
  };

export const { setProfiles } = profileSlice.actions;
export const { addProfile } = profileSlice.actions;
export const { editProfileName } = profileSlice.actions;
export const { setProfileByHouseholdAndUser } = profileSlice.actions;
export const { getProfilesByHouseholdId } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
