import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { tasks } from "../../data";
import { Task } from "../../types";

interface TaskState {
  tasks: Task[];
  filteredTasks: Task[];
  selectedTask: Task | null;
}

export const initialState: TaskState = {
  tasks: tasks,
  filteredTasks: [],
  selectedTask: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks = [...state.tasks, action.payload];
      console.log("task som las till: ", action.payload);
      console.log("nu är state tasks listan;", state.tasks);
      console.log("nu är state filtered tasks listan;", state.filteredTasks);
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const editedTaskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.id,
      );
      if (editedTaskIndex !== -1) {
        state.tasks[editedTaskIndex] = action.payload;
        console.log("task som redigerades: ", action.payload);
        console.log("nu är state tasks listan;", state.tasks);
        console.log("nu är state filtered tasks listan;", state.filteredTasks);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const taskIdToDelete = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== taskIdToDelete);
    },
    filterTaskListByHouseId: (
      state,
      action: PayloadAction<{ household_Id: string }>,
    ) => {
      const { household_Id } = action.payload;

      // Filtrera uppgifter baserat på householdId
      state.filteredTasks = state.tasks.filter(
        (task) => task.householdId === household_Id,
      );
    },

    findTaskById: (state, action: PayloadAction<{ taskId: string }>) => {
      const { taskId } = action.payload;
      const foundTask = state.tasks.find((task) => task.id === taskId);
      console.log("finding id", taskId);
      if (foundTask) {
        state.selectedTask = foundTask; // Update state.tasks with the found task
      } else {
        // Task with the given id not found, you can handle this case accordingly
      }
    },
  },
});

export const { addTask, editTask, filterTaskListByHouseId, findTaskById } =
  taskSlice.actions;

export const taskReducer = taskSlice.reducer;
