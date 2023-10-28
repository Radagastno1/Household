import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addProfileToDB,
  addProfileWithRequestToDB,
  getAllProfilesByHouseholdId,
  getAllProfilesByHouseholdIdDb,
  getAllProfilesByUserIdFromDb,
  saveProfileNameToDatabase,
} from "../../api/profile";
import { HouseholdRequest, Profile } from "../../types";

interface ProfileState {
  profiles: Profile[];
  activeProfile: Profile | null;
  profilesToUser: Profile[];
}

export const initialState: ProfileState = {
  profiles: [],
  activeProfile: null,
  profilesToUser: [],
};

export const addProfileAsync = createAsyncThunk(
  "profiles/addProfile",
  async (newProfile: Profile, thunkAPI) => {
    try {
      const createdProfile = await addProfileToDB(newProfile);

      if (createdProfile) {
        return createdProfile;
      } else {
        return thunkAPI.rejectWithValue("Failed to add profile");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addProfileWithRequest = createAsyncThunk(
  "profiles/addProfileWithRequest",
  async (
    { newProfile, userMail }: { newProfile: Profile; userMail: string },
    thunkAPI,
  ) => {
    try {
      //profil ska läggas till med tomt householdid och med en request fetch med
      const profileWithoutHouseholdId: Profile = {
        id: newProfile.id,
        profileName: newProfile.profileName,
        userId: newProfile.userId,
        householdId: "",
        avatar: newProfile.avatar,
        isOwner: newProfile.isOwner,
        isActive: true,
      };

      const request: HouseholdRequest = {
        id: "",
        profileId: newProfile.id,
        userMail: userMail,
        householdId: newProfile.householdId,
        status: "pending",
      };

      const createdProfileWithRequest = await addProfileWithRequestToDB(
        profileWithoutHouseholdId,
        request,
      );

      if (createdProfileWithRequest) {
        return createdProfileWithRequest;
      } else {
        return thunkAPI.rejectWithValue("Failed to add profile with request");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

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

export const getProfilesByHouseholdIdAsync = createAsyncThunk<
  Profile[],
  string,
  { rejectValue: string }
>("profiles/getProfilesByHouseholdId", async (householdId, thunkAPI) => {
  try {
    const fetchedProfiles = await getAllProfilesByHouseholdIdDb(householdId);
    if (fetchedProfiles) {
      console.log(
        "inne i try i thunken, profiles är för hurhållet är: ",
        fetchedProfiles,
      );
      return fetchedProfiles;
    } else {
      return thunkAPI.rejectWithValue("failed to get profi.es");
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
      .addCase(addProfileAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.profilesToUser.push(action.payload);
        }
      })
      .addCase(getProfilesByUserIdAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.profilesToUser = action.payload;
        }
      })
      .addCase(getProfilesByUserIdAsync.rejected, (state, action) => {
        console.log("error vid get profiles: ", action.payload);
      })
      .addCase(getProfilesByHouseholdIdAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.profiles = action.payload;
        }
      })
      .addCase(getProfilesByHouseholdIdAsync.rejected, (state, action) => {
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

export const profileReducer = profileSlice.reducer;
