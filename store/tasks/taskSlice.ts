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
}

export const initialState: TaskState = {
  tasks: [],
  filteredTasks: [],
  selectedTask: null,
};

export const addTaskAsync = createAsyncThunk<
  Task,
  Task,
  { rejectValue: string }
>("tasks/addTask", async (task, thunkAPI) => {
  try {
    const createdTask = await addTaskToDB(task);
    if (createdTask) {
      return createdTask;
    } else {
      return thunkAPI.rejectWithValue("failed to create task");
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const editTaskAsync = createAsyncThunk<
  Task,
  Task,
  { rejectValue: string }
>("tasks/editTask", async (task, thunkAPI) => {
  try {
    const editedTask = await editTaskToDB(task);
    if (editedTask) {
      return editedTask;
    } else {
      return thunkAPI.rejectWithValue("failed to edit task");
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
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
        console.log("error vid add task: ", action.payload);
      })
      .addCase(editTaskAsync.fulfilled, (state, action) => {
        if (action.payload) {
          const editedTaskIndex = state.tasks.findIndex(
            (task) => task.id === action.payload.id,
          );
          if (action.payload.id) {
            state.tasks[editedTaskIndex] = action.payload as Task;
          }
        }
      })
      .addCase(editTaskAsync.rejected, (state, action) => {
        console.log("error vid edit task: ", action.payload);
      });
  },
});

export const { deleteTask, filterTaskListByHouseId, findTaskById } =
  taskSlice.actions;

//denna ska anropas där vi behöver få in tasken från databasen och sättas som state = tasks
// Asynct Thunk Actiion (Redux Core)
export const fetchTasks =
  (activeHouseholdId: string) => async (dispatch: any, getState: any) => {
    const tasks = await getTasksFromDB(activeHouseholdId);
    dispatch(taskSlice.actions.setTasks(tasks));

    await dispatch(fetchCompletions(activeHouseholdId));
  };

export const taskReducer = taskSlice.reducer;
