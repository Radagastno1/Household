import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task } from "../../types";

interface TaskState {
  tasks: Task[];
}
export const initialState: TaskState = {
  tasks: [
    {
      id: "task1",
      title: "Damma vardagsrummet",
      description: "Damma vardagsrummets ytor",
      energiWeight: 4,
      creatingDate: new Date("2023-10-01"),
      interval: 5,
      householdId: "household1",
    },
  ],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks = [...state.tasks, action.payload];
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const editedTaskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.id,
      );

      if (editedTaskIndex !== -1) {
        state.tasks[editedTaskIndex] = action.payload;
      }
    },
  },
});

export const { addTask } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
