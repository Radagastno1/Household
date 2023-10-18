import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { tasks } from "../../data";
import { Task } from "../../types";
import { useAppSelector } from "../store";

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
    findTaskById: (state, action: PayloadAction<{ taskId: string }>) => {
      const { taskId } = action.payload;
      const foundTask = state.tasks.find((task) => task.id === taskId);

      if (foundTask) {
        state.tasks = [foundTask]; // Update state.tasks with the found task
      } else {
        // Task with the given id not found, you can handle this case accordingly
      }
    },
  },
});

export const { addTask, editTask, filterTaskListByHouseId, findTaskById } =
  taskSlice.actions;

export const taskReducer = taskSlice.reducer;
