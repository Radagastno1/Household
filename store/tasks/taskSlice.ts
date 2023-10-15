import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task, TaskCompletion } from "../../types";
import { taskCompletions, tasks } from "../../data";



interface TaskState {
  tasks: Task[];
}
interface TaskCompletionState{
    taskCompletions:TaskCompletion[];
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
    filterTaskListByHouseId: (state, action: PayloadAction<{ tasks: Task[]; household_Id: string }>) => {
        const { tasks, household_Id } = action.payload;
        state.tasks = tasks.filter((task) => task.householdId === household_Id);
      },
  },
});

export const { addTask, editTask,filterTaskListByHouseId } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
