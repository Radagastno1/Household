import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Task } from "../../types";

import {
  addTaskToDB,
  deleteTaskFromDB,
  editTaskToDB,
  getTasksFromDB,
} from "../../api/task";
import { fetchCompletions } from "../taskCompletionSlice";

interface TaskState {
  tasks: Task[];
  filteredTasks: Task[];
  selectedTask: Task | null;
  error: Error | undefined;
}

export const initialState: TaskState = {
  tasks: [],
  filteredTasks: [],
  selectedTask: null,
  error: undefined,
};

export const addTaskAsync = createAsyncThunk<
  Task,
  Task,
  { rejectValue: Error }
>("tasks/addTask", async (task, thunkAPI) => {
  try {
    const createdTask = await addTaskToDB(task);
    if (createdTask) {
      return createdTask;
    } else {
      return thunkAPI.rejectWithValue(new Error("Failed to create task"));
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
      console.log("antal tasks:", state.tasks.length);
    },
    editTask: (state, action: PayloadAction<Task>) => {
      editTaskToDB(action.payload).then((editedTask) => {
        if (editedTask) {
          const editedTaskIndex = state.tasks.findIndex(
            (task) => task.id === action.payload.id,
          );

          if (editedTaskIndex !== -1) {
            state.tasks[editedTaskIndex] = editedTask;
            console.log("Task som redigerades: ", editedTask);
            console.log("Nu är state tasks listan:", state.tasks);
            console.log(
              "Nu är state filtered tasks listan:",
              state.filteredTasks,
            );
          }
        }
      });
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const taskIdToDelete = action.payload;
      deleteTaskFromDB(taskIdToDelete);
      state.tasks = state.tasks.filter((task) => task.id !== taskIdToDelete);
    },
    filterTaskListByHouseId: (
      state,
      action: PayloadAction<{ household_Id: string }>,
    ) => {
      const { household_Id } = action.payload;

      // Filtrera uppgifter baserat på householdId
      state.filteredTasks = state.tasks.filter(
        //added isactive check also, so all archived tasks wont show here :)
        (task) => task.householdId === household_Id && task.isActive,
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
  extraReducers: (builder) => {
    builder
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.tasks = [...state.tasks, action.payload];
        }
      })
      .addCase(addTaskAsync.rejected, (state, action) => {
        state.error = action.payload;
        console.log("error vid add task: ", state.error?.message);
      });
  },
});

export const { editTask, deleteTask, filterTaskListByHouseId, findTaskById } =
  taskSlice.actions;

//denna ska anropas där vi behöver få in tasken från databasen och sättas som state = tasks
// Asynct Thunk Actiion (Redux Core)
export const fetchTasks =
  (activeHouseholdId: string) => async (dispatch: any, getState: any) => {
    // console.log("AAAAAAAAAAAAAAAAAAAa", dispatch, getState());
    const tasks = await getTasksFromDB(activeHouseholdId);
    dispatch(taskSlice.actions.setTasks(tasks));

    await dispatch(fetchCompletions(activeHouseholdId));
  };

export const taskReducer = taskSlice.reducer;
