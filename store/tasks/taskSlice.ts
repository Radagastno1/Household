import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Task } from "../../types";

import {
  addTaskToDB,
  deleteTaskFromDB,
  editTaskToDB,
  getTasksFromDB,
} from "../../api/task";
import { deleteAllTaskCompletionsByTaskId } from "../../api/taskCompletion";
import { fetchCompletions } from "../taskCompletion/taskCompletionSlice";
import { setActiveUser } from "../user/userSlice";

interface TaskState {
  tasks: Task[];
  filteredTasks: Task[];
  selectedTask: Task | null;
  error: string | null;
}

export const initialState: TaskState = {
  tasks: [],
  filteredTasks: [],
  selectedTask: null,
  error: null,
};

export const deleteTaskAsync = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("tasks/deleteTask", async (taskIdToDelete, thunkAPI) => {
  try {
    await deleteAllTaskCompletionsByTaskId(taskIdToDelete);
    await deleteTaskFromDB(taskIdToDelete);
    return taskIdToDelete;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

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
  } catch (error) {
    throw new Error("Något gick fel vid .");
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
      console.log("EDITED TASKKKKKKKKKKKKKKKK: ", editedTask);
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
    },
    filterTaskListByHouseId: (
      state,
      action: PayloadAction<{ household_Id: string }>,
    ) => {
      const { household_Id } = action.payload;
      state.filteredTasks = state.tasks.filter(
        (task) => task.householdId === household_Id && task.isActive,
      );
    },
    findTaskById: (state, action: PayloadAction<{ taskId: string }>) => {
      const { taskId } = action.payload;
      const foundTask = state.tasks.find((task) => task.id === taskId);
      if (foundTask) {
        state.selectedTask = foundTask;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setActiveUser, (state, action) => {
        if (!action.payload) {
          state.filteredTasks = [];
          state.selectedTask = null;
          state.tasks = [];
        }
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.tasks.push(action.payload);
          state.error = null;
        }
      })
      .addCase(addTaskAsync.rejected, (state, action) => {
        state.error =
          "Något gick fel när sysslan skapades. Försök igen senare.";
      })
      .addCase(editTaskAsync.fulfilled, (state, action) => {
        if (action.payload) {
          const editedTaskIndex = state.tasks.findIndex(
            (task) => task.id === action.payload.id,
          );
          if (action.payload.id) {
            state.tasks[editedTaskIndex] = action.payload as Task;
            state.error = null;
          }
        }
      })
      .addCase(editTaskAsync.rejected, (state, action) => {
        state.error =
          "Något gick fel vid redigering av sysslan. Försök igen senare.";
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.tasks = state.tasks.filter(
            (task) => task.id !== action.payload,
          );
        }
      });
  },
});

export const { filterTaskListByHouseId, findTaskById } = taskSlice.actions;

export const fetchTasks =
  (activeHouseholdId: string) => async (dispatch: any, getState: any) => {
    const tasks = await getTasksFromDB(activeHouseholdId);
    dispatch(taskSlice.actions.setTasks(tasks));

    await dispatch(fetchCompletions(activeHouseholdId));
  };

export const taskReducer = taskSlice.reducer;
