import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HouseholdRequest, Profile } from "../../types";
import {
  acceptProfileToHousehold,
  addProfileWithRequestToDB,
  getRequestByHouseholdIdFromDb,
} from "../../api/request";

interface RequestState {
  request: HouseholdRequest | null;
  requests: HouseholdRequest[];
  error: string | null;
}

export const initialState: RequestState = {
  request: null,
  requests: [],
  error: null,
};

export const getRequestByHouseholdIdsAsync = createAsyncThunk(
  "profiles/getRequestByHouseholdIds",
  async (householdIds: string[], thunkAPI) => {
    try {
      const fetchedRequests: HouseholdRequest[] = [];

      await Promise.all(
        householdIds.map(async (householdId) => {
          const requests = await getRequestByHouseholdIdFromDb(householdId);
          if (requests) {
            fetchedRequests.push(...requests);
          }
        }),
      );
      return fetchedRequests;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addProfileWithRequest = createAsyncThunk(
  "profiles/addProfileWithRequest",
  async (
    {
      newProfile,
      userMail,
      householdId,
    }: { newProfile: Profile; userMail: string; householdId: string },
    thunkAPI,
  ) => {
    try {
      if (userMail) {
        const request: HouseholdRequest = {
          id: "", 
          profileId: "",
          userMail: userMail,
          householdId: householdId,
          status: "pending",
        };

        const createdProfileWithRequest = await addProfileWithRequestToDB(
          newProfile,
          request,
        );

        if (createdProfileWithRequest) {
          return createdProfileWithRequest.id;
        } else {
          throw new Error("Något gick fel med att skicka en förfrågan.");
        }
      }
    } catch (error: any) {
      throw new Error("Något gick fel med att skicka en förfrågan.");
    }
  },
);

export const acceptProfileToHouseholdAsync = createAsyncThunk(
  "request/acceptProfileToHousehold",
  async ({ requestId }: { requestId: string }, thunkAPI) => {
    try {
      if (requestId) {
        await acceptProfileToHousehold(requestId);
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    setRequest: (state, action) => {
      state.requests = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRequestByHouseholdIdsAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.requests = action.payload;
        }
      })
      .addCase(getRequestByHouseholdIdsAsync.rejected, (state, action) => {
        state.error = "Något gick fel vid gå med i hushåll.";
      });
  },
});

export const {} = requestSlice.actions;

export const requestReducer = requestSlice.reducer;
