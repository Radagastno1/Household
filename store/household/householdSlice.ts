import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addHouseholdToDB } from "../../api/household";
import { Household } from "../../types";

interface HouseholdState {
  households: Household[];
  selectedHousehold: Household | null;
  activeHousehold: Household | null;
}

const initialState: HouseholdState = {
  households: [],
  selectedHousehold: null,
  activeHousehold: null,
};

// Code generator function
export const generateHouseholdCode = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const code =
    getRandomElement(letters) +
    getRandomElement(letters) +
    getRandomElement(letters) +
    getRandomElement(numbers) +
    getRandomElement(numbers);
  return code;
};

const householdSlice = createSlice({
  name: "household",
  initialState,
  reducers: {
    sethousehold: (state, action: PayloadAction<Household>) => {
      state.households = [...state.households, action.payload];
    },
    addHousehold: (state, action: PayloadAction<Household>) => {
      const code = generateHouseholdCode(); // Generate a unique code
      const householdWithCode = { ...action.payload, code }; // Add the code to the household
      addHouseholdToDB(householdWithCode)
        .then((createdHousehold) => {
          if (createdHousehold) {
            state.households = [...state.households, createdHousehold];
            console.log("Household added: ", createdHousehold);
          }
        })
        .catch((error) => {
          console.error("Error adding household:", error);
        });
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
        // Handle the case when the household is not found
      }
    },
    joinHouseholdByCode: (state, action: PayloadAction<string>) => {
      // Find the household by the provided code
      const joinedHouseholdByCode = state.households.find(
        (household) => household.code === action.payload,
      );

      if (joinedHouseholdByCode) {
        // Add logic for joining the household here, e.g., set the active household
        state.activeHousehold = joinedHouseholdByCode;
      }
    },
  },
});
export const {
  addHousehold,
  findHouseholdById,
  joinHouseholdByCode,
  setHouseholdByHouseholdId,
} = householdSlice.actions;

export const householdReducer = householdSlice.reducer;

// Helper function to get a random element from a string
const getRandomElement = (array: string) => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};
