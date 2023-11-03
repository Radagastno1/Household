import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addHouseholdToDB,
  checkHouseholdWithCode,
  editHouseholdToDB,
  getHouseholdsFromDB,
} from "../../api/household";
import { Household } from "../../types";
import { setActiveUser } from "../user/userSlice";

export interface HouseholdState {
  households: Household[];
  selectedHousehold: Household | null;
  activeHousehold: Household | null;
  error: string | null;
}

export const initialState: HouseholdState = {
  households: [],
  selectedHousehold: null,
  activeHousehold: null,
  error: null,
};

export const getHouseholdsByHouseholdIdAsync = createAsyncThunk<
  Household[],
  string[],
  { rejectValue: string }
>("households/getHouseholdByHouseholdId", async (householdIds, thunkAPI) => {
  try {
    const households = await getHouseholdsFromDB(householdIds);
    return households;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const setActiveHouseholdAsync = createAsyncThunk(
  "households/setActiveHousehold",
  async (incomingHousehold: Household, thunkAPI) => {
    try {
      if (incomingHousehold) {
        sethouseholdActive(incomingHousehold);
      } else {
        return thunkAPI.rejectWithValue("Failed to add profile");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const handleJoinHousehold = async (joinCode: string) => {
  if (joinCode) {
    const household = await checkHouseholdWithCode(joinCode);
    if (household) {
      return household;
    } else {
      return null;
    }
  }
};

export const addHouseholdAsync = createAsyncThunk<
  Household | null,
  string,
  { rejectValue: string }
>("households/addHousehold", async (householdName, thunkAPI) => {
  try {
    const household = (await addHouseholdToDB(
      householdName,
    )) as Household | null;
    return household;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const editHouseHoldAsync = createAsyncThunk<
  Household,
  Household,
  { rejectValue: string }
>("household/editHouseHold", async (household, thunkAPI) => {
  try {
    const editHouseHold = await editHouseholdToDB(household);
    if (editHouseHold) {
      return editHouseHold;
    } else {
      return thunkAPI.rejectWithValue("failed to edit household");
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const householdSlice = createSlice({
  name: "household",
  initialState,
  reducers: {
    sethousehold: (state, action: PayloadAction<Household>) => {
      state.households = [...state.households, action.payload];
    },
    sethouseholdActive: (state, action: PayloadAction<Household>) => {
      state.activeHousehold = action.payload;
    },
    setHouseholdByHouseholdId: (
      state,
      action: PayloadAction<{ householdId: string }>,
    ) => {
      const activehousehold = state.households.find(
        (p) => p.id === action.payload.householdId,
      );
      if (activehousehold) {
        state.activeHousehold = activehousehold;
      }
    },
    findHouseholdById: (
      state,
      action: PayloadAction<{ householdId: string }>,
    ) => {
      const { householdId } = action.payload;
      const foundHousehold = state.households.find(
        (household) => household.id === householdId,
      );
      if (foundHousehold) {
        state.selectedHousehold = foundHousehold;
      } else {
      }
    },

    editHouseHoldeName: (
      state,
      action: PayloadAction<{ householdId: string; newHouseholdName: string }>,
    ) => {
      if (state.activeHousehold?.id === action.payload.householdId) {
        const householdToEdit = state.activeHousehold;
        if (householdToEdit) {
          householdToEdit.name = action.payload.newHouseholdName;

          editHouseholdToDB(householdToEdit)
            .then((updatedHousehold) => {
              if (updatedHousehold) {
                const editedHouseholdIndex = state.households.findIndex(
                  (household) => household.id === updatedHousehold.id,
                );
                state.households[editedHouseholdIndex] = updatedHousehold;
              }
            })
            .catch((error) => {
              state.error = "Något gick fel vid redigering av hushållet.";
            });
        }
      }
    },
    updateHousehold: (state, action) => {
      const updatedHousehold = action.payload;
      const index = state.households.findIndex(
        (h) => h.id === updatedHousehold.id,
      );
      if (index !== -1) {
        state.households[index] = updatedHousehold;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setActiveUser, (state, action) => {
        if (!action.payload) {
          state.selectedHousehold = null;
          state.activeHousehold = null;
          state.households = [];
        }
      })
      .addCase(editHouseHoldAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.activeHousehold = action.payload;
        }
      })
      .addCase(editHouseHoldAsync.rejected, (state, action) => {
        state.error =
          "Något blir fel vid hämtning av dina hushåll. Försök igen snart.";
      })

      .addCase(getHouseholdsByHouseholdIdAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.households = action.payload;
        }
      })
      .addCase(getHouseholdsByHouseholdIdAsync.rejected, (state, action) => {
        state.error = "Något gick fel vid hämtning av hushållen.";
      })
      .addCase(addHouseholdAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.households = [...state.households, action.payload];
        }
      })
      .addCase(addHouseholdAsync.rejected, (state, action) => {
        state.error = "Något gick fel. Försök igen senare.";
      });
  },
});

export const {
  findHouseholdById,
  setHouseholdByHouseholdId,
  editHouseHoldeName,
  sethouseholdActive,
  updateHousehold,
} = householdSlice.actions;

export const householdReducer = householdSlice.reducer;
