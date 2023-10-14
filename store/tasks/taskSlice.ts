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
    taskList:(state,action: PayloadAction<Task[]>)=>{
      state.tasks = action.payload
    },
  },
});

export const { addTask, editTask,taskList } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
