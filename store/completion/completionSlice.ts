import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { profiles, taskCompletions } from "../../data";
import {TaskCompletion} from "../../types";
import { useAppSelector } from "../store";

interface TaskCompletionState {
  taskCompletions: TaskCompletion[];
  avatarInCompletion:string;
}

export const initialState: TaskCompletionState = {
  taskCompletions: taskCompletions,
avatarInCompletion:"",
};

const taskCompletionSlice = createSlice({
  name: "completion",
  initialState,
  reducers: {
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

export const {findCompletionsByTaskId,findCompletionsByTaskAndProfielId,findAvatarInCompletionByTaskId  } =
  taskCompletionSlice.actions;

export const taskCompletionReducer = taskCompletionSlice.reducer;
