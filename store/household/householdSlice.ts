import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addHouseholdToDB, checkHouseholdWithCode } from "../../api/household";
import { RootStackParamList } from "../../navigators/RootNavigator";
import { Household } from "../../types";

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
export const handleJoinHousehold = async (joinCode: string) => {
  if (joinCode) {
    // Dispatch the action and await its completion
    const household = await checkHouseholdWithCode(joinCode);
    if (household) {
      const householdId = household.id;
      return household;
    } else {
      console.error(
        "Failed to join the household. Please check the join code.",
      );
      return null;
    }
  }
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
    sethouseholdActive: (state, action: PayloadAction<Household>) => {
      state.activeHousehold = action.payload;
    },
    addHousehold: (state, action: PayloadAction<Household>) => {
      const navigation =
        useNavigation<StackNavigationProp<RootStackParamList>>();

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
      }
    },
  },
});

export const { addHousehold, findHouseholdById, setHouseholdByHouseholdId   sethouseholdActive,
} =
  householdSlice.actions;

export const householdReducer = householdSlice.reducer;

const setActiveHousehold = (household: Household) => {
  return {
    type: "household/setActiveHousehold",
    payload: household,
  };
};

// Helper function to get a random element from a string
const getRandomElement = (array: string) => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

function joinHouseholdByCode(joinCode: string) {
  throw new Error("Function not implemented.");
}
