import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Household } from "../../types";
import { households } from "../../data";

interface HouseholdState {
  households: Household[];
  activehousehold: Household | null;
}

export const initialState: HouseholdState = {
  households: households,
  activehousehold: null
};

const householdSlice = createSlice({
  name: "household",
  initialState,
  reducers: {
    sethousehold: (state, action: PayloadAction<Household>) => {
      state.households = [...state.households, action.payload];
    },
    // edithouseholdName: (state, action: PayloadAction<household>) => {
    //   state.households = [...state.households, action.payload];
    // },

    setHouseholdByHouseholdId:(state, action:PayloadAction<{householdId:string}>) => {
        const activehousehold = state.households.find(p => p.id === action.payload.householdId)
        if (activehousehold) {
          state.activehousehold = activehousehold;
        }
      },
  }, 
});

export const { sethousehold } = householdSlice.actions;

export const { setHouseholdByHouseholdId } = householdSlice.actions;

export const householdReducer = householdSlice.reducer;
