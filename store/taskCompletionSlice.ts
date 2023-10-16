import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskCompletion } from "../types";

interface TaskCompletionState {
  taskCompletions: TaskCompletion[];
}

const initialState: TaskCompletionState = {
  taskCompletions: [],
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

      const todaysDate = new Date();

      const newTaskCompletion: TaskCompletion = {
        id: todaysDate.getUTCMilliseconds.toString().slice(-4),
        taskId: action.payload.taskId,
        profileId: action.payload.profileId,
        completionDate: new Date(),
      };

      state.taskCompletions.push(newTaskCompletion);
    },
  },
});

export const { setTaskAsCompleted } = taskCompletionSlice.actions;

export const taskCompletionReducer = taskCompletionSlice.reducer;
