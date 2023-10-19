import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskCompletion } from "../types";
import { useAppSelector } from "./store";
import { profiles, taskCompletions } from "../data";
import { Avatars } from "../data/avatars";

interface TaskCompletionState {
  completions: TaskCompletion[];
  avatars: string[];
}

const initialState: TaskCompletionState = {
  completions: taskCompletions,
  avatars: [],
};

const taskCompletionSlice = createSlice({
  name: "taskCompletion",
  initialState,
  reducers: {
    setTaskAsCompleted: (
      state,
      action: PayloadAction<{ taskId: string; profileId: string }>,
    ) => {
      //en task id och en profile id  måste komma in här
      //en taskCompletion - objekt skapas (id, taskId, profileId, completionDate)
      //man kan ju också skapa objektet utifrån om man vill det hellre?
      console.log("profile id som kommer in:", action.payload.profileId);
      const todaysDate = new Date();

      const newTaskCompletion: TaskCompletion = {
        id: todaysDate.getUTCMilliseconds.toString().slice(-4),
        taskId: action.payload.taskId,
        profileId: action.payload.profileId,
        completionDate: new Date().toISOString(),
      };
      console.log("new task", newTaskCompletion);
      state.completions.push(newTaskCompletion);
    },
//taskt detail screen still using this function
    findAllAvatarFortodayCompletionByTaskId: (
      state,
      action: PayloadAction<{ taskId: string }>,
    ) => {
      const { taskId } = action.payload;
      const today = new Date().toISOString();
      //filter the completions with the same taskId
      const filteredCompletions = state.completions.filter(
        (completion) =>
          completion.completionDate.split("T")[0] === today.split("T")[0] && completion.taskId === taskId,
      );
      // get the unique profileIds
      const uniqueProfileIds = [
        ...new Set(
          filteredCompletions?.map((completion) => completion.profileId),
        ),
      ];
      console.log(uniqueProfileIds);
      // profiles corresponding to the unique profileIds
      const profilesForTask = profiles.filter((profile) =>
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
      action: PayloadAction<{ taskId: string }>,
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
      const profilesForTask = profiles.filter((profile) =>
        uniqueProfileIds.includes(profile.id),
      );

      const avatarList = profilesForTask.map((profile) => profile.avatar);
      state.avatars = avatarList;
    },
  },
});

export const {
  setTaskAsCompleted,
  findCompletionsByTaskId,
  findCompletionsByTaskIdAndCompletionDate,
  findCompletionsByTaskAndProfielId,
  findAllAvatarInCompletionByTaskId,
  findAllAvatarFortodayCompletionByTaskId,
} = taskCompletionSlice.actions;

export const taskCompletionReducer = taskCompletionSlice.reducer;
