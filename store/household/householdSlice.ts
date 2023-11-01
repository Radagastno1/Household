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
}

export const initialState: HouseholdState = {
  households: [],
  selectedHousehold: null,
  activeHousehold: null,
};

export const getHouseholdsByHouseholdIdAsync = createAsyncThunk<
  Household[],
  string[],
  { rejectValue: string }
>("households/getHouseholdByHouseholdId", async (householdIds, thunkAPI) => {
  try {
    const fetchedHouseholds: Household[] = [];
    for (const id of householdIds) {
      const household = await getHouseholdsFromDB(id);
      if (household) {
        fetchedHouseholds.push(household as Household);
      }
    }
    console.log("Hämtade hushåll: ", fetchedHouseholds);
    return fetchedHouseholds;
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
    // Dispatch the action and await its completion
    const household = await checkHouseholdWithCode(joinCode);
    if (household) {
      console.log(household);
      return household;
    } else {
    //   console.error(
    //     "Failed to join the household. Please check the join code.",
    //   );
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
export const editHouseHoldeNameAsync = createAsyncThunk<
Household,
Household,
{rejectValue:string}
> ("household/editHouseHoldeName", async (household, thunkAPI)=>{
    try{
        const editHouseHoldeName = await editHouseholdToDB(household);
        if(editHouseHoldeName){
            return editHouseHoldeName;
        }else{
            return thunkAPI.rejectWithValue("failed to edit household");
        }
    }catch (error: any) {
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
      console.log("HUSHÅLLID SOM KOMMER IN: ", action.payload.householdId);
      console.log("AKTIVA HUSHÅLLET ID: ", state.activeHousehold?.id);
      if (state.activeHousehold?.id === action.payload.householdId) {
        const householdToEdit = state.activeHousehold;
        console.log("HUSHÅLLET SOM HITTAS, ", householdToEdit);
        if (householdToEdit) {
          householdToEdit.name = action.payload.newHouseholdName;
          console.log("det nya NAMNET BLIR: ", householdToEdit.name);

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
              console.error("Error editing household:", error);
            });
        }
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
      .addCase(getHouseholdsByHouseholdIdAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.households = action.payload;
        }
      })
      .addCase(getHouseholdsByHouseholdIdAsync.rejected, (state, action) => {
        console.log("error vid get households: ", action.payload);
      })
      .addCase(addHouseholdAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.households = [...state.households, action.payload];
        }
      })
      .addCase(addHouseholdAsync.rejected, (state, action) => {
        console.log("error vid add household: ", action.payload);
      });
    // .addCase(getRequestByHouseholdIdsAsync.fulfilled, (state, action) => {
    //   if (action.payload) {
    //     state.requests = action.payload;
    //   }
    // })
    // .addCase(getRequestByHouseholdIdsAsync.rejected, (state, action) => {
    //   console.log("error vid get requests: ", action.payload);
    // });
  },
});

export const {
  findHouseholdById,
  setHouseholdByHouseholdId,
  editHouseHoldeName,
  sethouseholdActive,
  // getHouseholdsByHouseholdId,
} = householdSlice.actions;

export const householdReducer = householdSlice.reducer;

const setActiveHousehold = (household: Household) => {
  return {
    type: "household/setActiveHousehold",
    payload: household,
  };
};

// // Helper function to get a random element from a string
// const getRandomElement = (array: string) => {
//   const index = Math.floor(Math.random() * array.length);
//   return array[index];
// };
