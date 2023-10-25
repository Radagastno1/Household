import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addTaskCompletionToDB,
  getTaskCompletionsFromDB,
} from "../api/taskCompletion";
import { TaskCompletion } from "../types";
import {Profile} from "../types"

interface TaskCompletionState {
  completions: TaskCompletion[];
  avatars: string[];
}

const initialState: TaskCompletionState = {
  //ändrat här så vi inte går efter mockade datan nu när den ska kolla mot db
  completions: [],
  avatars: [],
};

//createEntityAdapter - setAll   (householdId och inte varje task - id ELLER alla taskidn)

export const addCompletionAsync = createAsyncThunk<
  TaskCompletion,
  TaskCompletion,
  { rejectValue: string }
>("completions/addCompletion", async (completion, thunkAPI) => {
  try {
    const addedCompletion = await addTaskCompletionToDB(completion);
    if (addedCompletion) {
      return addedCompletion;
    } else {
      return thunkAPI.rejectWithValue("failed to add completion");
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


    const taskCompletionSlice = createSlice({
        name: "taskCompletion",
        initialState,
        reducers: {
          setCompletions: (state, action) => {
            state.completions = action.payload;
          },
          //taskt detail screen still using this function
          findAllAvatarFortodayCompletionByTaskId: (
            state,
            action: PayloadAction<{ taskId: string, profiles:Profile[] }>,
          ) => {
            const { taskId } = action.payload;
            const today = new Date().toISOString();
            //filter the completions with the same taskId
            const filteredCompletions = state.completions.filter(
              (completion) =>
                completion.completionDate.split("T")[0] === today.split("T")[0] &&
                completion.taskId === taskId,
            );
            // get the unique profileIds
            const uniqueProfileIds = [
              ...new Set(
                filteredCompletions?.map((completion) => completion.profileId),
              ),
            ];
            console.log(uniqueProfileIds);
            // profiles corresponding to the unique profileIds
            const profilesForTask = action.payload.profiles.filter((profile) =>
              uniqueProfileIds.includes(profile.id),
            );
      
            const avatarList = profilesForTask.map((profile) => profile.avatar);
            state.avatars = avatarList;
          },
      
          findCompletionsByTaskId: (
            state,
            action: PayloadAction<{ taskId: string }>,
          ) => {
            const { taskId: id } = action.payload;
            const foundCompletion = state.completions.find(
              (completion) => completion.id === id,
            );
      
            if (foundCompletion) {
              state.completions = [foundCompletion];
            } else {
            }
          },
      
          findCompletionsByTaskIdAndCompletionDate: (
            state,
            action: PayloadAction<{ taskId: string; completionDate: string }>,
          ) => {
            const { taskId, completionDate } = action.payload;
      
            const today = new Date().toISOString();
            // Filter task completions for the given Task ID and today's date
            const todaysCompletions = state.completions.filter(
              (completion) =>
                completion.completionDate.split("T")[0] === today.split("T")[0],
            );
      
            if (todaysCompletions) {
              console.log("in slice today completion", todaysCompletions);
              state.completions = todaysCompletions;
            } else {
            }
          },
      
          findCompletionsByTaskAndProfielId: (
            state,
            action: PayloadAction<{ taskId: string; profileId: string }>,
          ) => {
            const { taskId, profileId } = action.payload;
            const foundCompletion = state.completions.find(
              (completion) =>
                completion.taskId === taskId && completion.profileId === profileId,
            );
            if (foundCompletion) {
              state.completions = [foundCompletion];
            } else {
            }
          },
      
          findAllAvatarInCompletionByTaskId: (
            state,
            action: PayloadAction<{ taskId: string, profiles:Profile[] }>,
          ) => {
            const { taskId } = action.payload;
            //filter the completions with the same taskId
            const filteredCompletions = state.completions.filter(
              (completion) => completion.taskId === taskId,
            );
            // get the unique profileIds
            const uniqueProfileIds = [
              ...new Set(
                filteredCompletions?.map((completion) => completion.profileId),
              ),
            ];
      
            // profiles corresponding to the unique profileIds
            const profilesForTask = action.payload.profiles.filter((profile) =>
              uniqueProfileIds.includes(profile.id),
            );
      
            const avatarList = profilesForTask.map((profile) => profile.avatar);
            state.avatars = avatarList;
          },
        },
        extraReducers: (builder) => {
          builder
            .addCase(addCompletionAsync.fulfilled, (state, action) => {
              if (action.payload) {
                state.completions = [...state.completions, action.payload];
              }
            })
            .addCase(addCompletionAsync.rejected, (state, action) => {
              console.log("error vid add completion: ", action.payload);
            });
        },
      });
      
  
  


export const {
  findCompletionsByTaskId,
  findCompletionsByTaskAndProfielId,
  findAllAvatarInCompletionByTaskId,
  findAllAvatarFortodayCompletionByTaskId,
} = taskCompletionSlice.actions;

//FRÅGA DAVID ÄR DETTA OK VERKLIGEN?
export const fetchCompletions =
  (householdId: string) => async (dispatch: any) => {
    const completions = await getTaskCompletionsFromDB(householdId);

    dispatch(taskCompletionSlice.actions.setCompletions(completions));
  };

export const taskCompletionReducer = taskCompletionSlice.reducer;
