import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task, TaskCompletion } from "../../types";
import { taskCompletions, tasks } from "../../data";

interface TaskState {
  tasks: Task[];
}

export const initialState: TaskState = {
  tasks: tasks,
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
    filterTaskListByHouseId: (
      state,
      action: PayloadAction<{ tasks: Task[]; household_Id: string }>,
    ) => {
      const { tasks, household_Id } = action.payload;
      state.tasks = tasks.filter((task) => task.householdId === household_Id);
    },
    findTaskById: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const foundTask = state.tasks.find((task) => task.id === id);

      if (foundTask) {
        state.tasks = [foundTask]; // Update state.tasks with the found task
      } else {
        // Task with the given id not found, you can handle this case accordingly
      }
    },
  },
});

export const { addTask, editTask, filterTaskListByHouseId, findTaskById } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
