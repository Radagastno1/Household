import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addTaskCompletionToDB,
  getTaskCompletionsFromDB,
} from "../../api/taskCompletion";
import { Profile, TaskCompletion } from "../../types";
import { setActiveUser } from "../user/userSlice";

interface TaskCompletionState {
  completions: TaskCompletion[];
  avatars: string[];
  error: string | null;
}

const initialState: TaskCompletionState = {
  completions: [],
  avatars: [],
  error: null,
};

export const addCompletionAsync = createAsyncThunk<
  TaskCompletion,
  TaskCompletion,
  { rejectValue: string }
>("completions/addCompletion", async (completion, thunkAPI) => {
  try {
    const addedCompletion = await addTaskCompletionToDB(completion);
    if (addedCompletion) {
      console.log("DEEEEN TILLLLAGDA COMPLETIONNNNENNNNNN: ", addedCompletion);
      return addedCompletion;
    } else {
      throw new Error("Något gick fel. Försök igen senare.");
    }
  } catch (error) {
    throw new Error("Något gick fel. Försök igen senare.");
  }
});

const taskCompletionSlice = createSlice({
  name: "taskCompletion",
  initialState,
  reducers: {
    setCompletions: (state, action) => {
      state.completions = action.payload;
    },
    findAllAvatarFortodayCompletionByTaskId: (
      state,
      action: PayloadAction<{ taskId: string; profiles: Profile[] }>,
    ) => {
      const { taskId } = action.payload;
      const today = new Date().toISOString();

      const filteredCompletions = state.completions.filter(
        (completion) =>
          completion.completionDate.split("T")[0] === today.split("T")[0] &&
          completion.taskId === taskId,
      );

      const uniqueProfileIds = [
        ...new Set(
          filteredCompletions?.map((completion) => completion.profileId),
        ),
      ];

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
      action: PayloadAction<{ taskId: string; profiles: Profile[] }>,
    ) => {
      const { taskId } = action.payload;
      const filteredCompletions = state.completions.filter(
        (completion) => completion.taskId === taskId,
      );

      const uniqueProfileIds = [
        ...new Set(
          filteredCompletions?.map((completion) => completion.profileId),
        ),
      ];

      const profilesForTask = action.payload.profiles.filter((profile) =>
        uniqueProfileIds.includes(profile.id),
      );

      const avatarList = profilesForTask.map((profile) => profile.avatar);
      state.avatars = avatarList;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setActiveUser, (state, action) => {
      if (!action.payload) {
        state.avatars = [];
        state.completions = [];
      }
    });
    builder
      .addCase(addCompletionAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.completions = [...state.completions, action.payload];
          state.error = null;
        }
      })
      .addCase(addCompletionAsync.rejected, (state, action) => {
        console.log("INNE I CATCH", action.error.message);
        state.error = "Något gick fel. Prova igen senare.";
      });
  },
});

export const {
  findCompletionsByTaskId,
  findCompletionsByTaskAndProfielId,
  findAllAvatarInCompletionByTaskId,
  findAllAvatarFortodayCompletionByTaskId,
} = taskCompletionSlice.actions;

export const fetchCompletions =
  (householdId: string) => async (dispatch: any) => {
    const completions = await getTaskCompletionsFromDB(householdId);

    dispatch(taskCompletionSlice.actions.setCompletions(completions));
  };

export const taskCompletionReducer = taskCompletionSlice.reducer;
