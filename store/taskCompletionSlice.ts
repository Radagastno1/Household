import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskCompletion } from "../types";
import { useAppSelector } from "./store";
import { profiles, taskCompletions } from "../data";

interface TaskCompletionState {
  taskCompletions: TaskCompletion[];
  avatarInCompletion:string;
}

const initialState: TaskCompletionState = {
  taskCompletions: taskCompletions,
  avatarInCompletion:"",
};

const taskCompletionSlice = createSlice({
  name: "task",
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

      state.taskCompletions.push(newTaskCompletion);
    },
    findCompletionsByTaskId: (state, action: PayloadAction<{ taskId: string }>) => {
        const { taskId: id } = action.payload;
        const foundCompletion = state.taskCompletions.find((completion) => completion.id === id);
  
        if (foundCompletion) {
          state.taskCompletions = [foundCompletion]; 
        } else {
        }
      },
      findCompletionsByTaskAndProfielId: (state, action: PayloadAction<{ taskId: string, profielId:string }>) => {
        const { taskId,profielId } = action.payload;
        const foundCompletion = state.taskCompletions.find((completion) => completion.taskId=== taskId && completion.profileId === profielId);
        if (foundCompletion) {
          state.taskCompletions = [foundCompletion]; 
        } else {
        }
      },
      findAvatarInCompletionByTaskId: (state, action: PayloadAction<{ taskId: string }>) => {
        const { taskId } = action.payload;
        const foundCompletion = state.taskCompletions.find((completion) => completion.taskId === taskId);
        const profile = profiles.find ((p)=>p.id === foundCompletion?.profileId);

        if (profile) {
          const foundAvatar = profile.avatar
          state.avatarInCompletion = foundAvatar;

        }
      },
  },
});

export const { setTaskAsCompleted,findCompletionsByTaskId,findCompletionsByTaskAndProfielId,findAvatarInCompletionByTaskId } = taskCompletionSlice.actions;

export const taskCompletionReducer = taskCompletionSlice.reducer;
