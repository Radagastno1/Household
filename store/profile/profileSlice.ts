import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addProfileToDB,
  deactivateProfileInDB,
  editProfileToDB,
  getAllProfilesByHouseholdId,
  getAllProfilesByHouseholdIdDb,
  getAllProfilesByUserIdFromDb,
  saveProfileNameToDatabase,
} from "../../api/profile";
import { Profile } from "../../types";
import { AppDispatch, RootState } from "../store";
import { setActiveUser } from "../user/userSlice";

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

export const editProfileAsync = createAsyncThunk<
Profile,
Profile,
{rejectValue:string}
> ("profile/editProfile", async (profile, thunkAPI)=>{
    try{
        const editProfile = await editProfileToDB(profile);
        if(editProfile){
            
            return editProfile;
            
        }else{
            return thunkAPI.rejectWithValue("failed to edit household");
        }
    }catch (error: any) {
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
    editProfile: (state, action) => {
        const updatedProfile = action.payload;
        // Find the index of the edited household in the state
        const index = state.profiles.findIndex(p => p.id === updatedProfile.id);
        if (index !== -1) {
          // Replace only the existing household with the updated one
          state.profiles[index] = updatedProfile;
        }
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setActiveUser, (state, action) => {
        if (!action.payload) {
          state.activeProfile = null;
          state.profiles = [];
          state.profilesToUser = [];
        }
      })
      .addCase(addProfileAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.profilesToUser.push(action.payload);
        }
      })
      
      .addCase(editProfileAsync.fulfilled,(state,action)=>{
        if(action.payload){
            state.activeProfile = action.payload
        }
      })
      .addCase(editProfileAsync.rejected,(state,action)=>{
        console.log("error vid get households: ", action.payload);
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
  async (dispatch: AppDispatch, getState: () => RootState) => {
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
export const deactivateProfileAsync = createAsyncThunk(
  "profiles/deactivateProfile",
  async (profileId: string, thunkAPI) => {
    try {
      const response = await deactivateProfileInDB(profileId);
      if (response.success) {
        return true;
      } else {
        return thunkAPI.rejectWithValue(response.error);
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const { setProfiles } = profileSlice.actions;
export const { addProfile } = profileSlice.actions;
export const { editProfileName } = profileSlice.actions;
export const { setProfileByHouseholdAndUser } = profileSlice.actions;
export const {editProfile} = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
