import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addTaskCompletionToDB,
  getTaskCompletionsFromDB,
} from "../api/taskCompletion";
import { profiles } from "../data";
import { TaskCompletion } from "../types";
import { getCurrentDate } from "../utils/dateHandler";

const { todaysDate } = getCurrentDate();

interface TaskCompletionState {
  completions: TaskCompletion[];
  avatars: string[];
}

const initialState: TaskCompletionState = {
  //ändrat här så vi inte går efter mockade datan nu när den ska kolla mot db
  completions: [],
  avatars: [],
};

//createEntityAdapter - setAll   (householdId och inte varje task - id ELLER alla taskidn)

const taskCompletionSlice = createSlice({
  name: "taskCompletion",
  initialState,
  reducers: {
    setCompletions: (state, action) => {
      state.completions = action.payload;
    },
    setTaskAsCompleted: (
      state,
      action: PayloadAction<{
        taskId: string;
        profileId: string;
        householdId: string;
      }>,
    ) => {
      console.log("profile id som kommer in:", action.payload.profileId);

      const newTaskCompletion: TaskCompletion = {
        id: "",
        taskId: action.payload.taskId,
        householdId: action.payload.householdId,
        profileId: action.payload.profileId,
        completionDate: todaysDate,
      };
      console.log("new task", newTaskCompletion);

      addTaskCompletionToDB(newTaskCompletion)
        .then((createdTaskCompletion) => {
          if (createdTaskCompletion) {
            state.completions.push(newTaskCompletion);
          }
        })
        .catch((error) => {
          console.error("Fel vid tillägg av task completion:", error);
        });
    },
    //taskt detail screen still using this function
    findAllAvatarFortodayCompletionByTaskId: (
      state,
      action: PayloadAction<{ taskId: string }>,
    ) => {
      const { taskId } = action.payload;
      const today = todaysDate;
      //filter the completions with the same taskId
      const filteredCompletions = state.completions.filter(
        (completion) =>
          completion.completionDate === today && completion.taskId === taskId,
      );
      // get the unique profileIds
      const uniqueProfileIds = [
        ...new Set(
          filteredCompletions?.map((completion) => completion.profileId),
        ),
      ];
      console.log(uniqueProfileIds);
      // profiles corresponding to the unique profileIds
      const profilesForTask = profiles.filter((profile) =>
        uniqueProfileIds.includes(profile.id),
      );

      const avatarList = profilesForTask.map((profile) => profile.avatar);
      state.avatars = avatarList;
    },

    findCompletionsByTaskId: (
      state,
      action: PayloadAction<{ taskId: string }>,
    ) => {
      const { taskId: id } = action.payload;
      const foundCompletion = state.completions.find(
        (completion) => completion.id === id,
      );

      if (foundCompletion) {
        state.completions = [foundCompletion];
      } else {
      }
    },

    findCompletionsByTaskIdAndCompletionDate: (
      state,
      action: PayloadAction<{ taskId: string; completionDate: string }>,
    ) => {
      const { taskId, completionDate } = action.payload;

      const today = todaysDate;
      // Filter task completions for the given Task ID and today's date
      const todaysCompletions = state.completions.filter(
        (completion) => completion.completionDate === today,
      );

      if (todaysCompletions) {
        console.log("in slice today completion", todaysCompletions);
        state.completions = todaysCompletions;
      } else {
      }
    },

    findCompletionsByTaskAndProfielId: (
      state,
      action: PayloadAction<{ taskId: string; profileId: string }>,
    ) => {
      const { taskId, profileId } = action.payload;
      const foundCompletion = state.completions.find(
        (completion) =>
          completion.taskId === taskId && completion.profileId === profileId,
      );
      if (foundCompletion) {
        state.completions = [foundCompletion];
      } else {
      }
    },

    findAllAvatarInCompletionByTaskId: (
      state,
      action: PayloadAction<{ taskId: string }>,
    ) => {
      const { taskId } = action.payload;
      //filter the completions with the same taskId
      const filteredCompletions = state.completions.filter(
        (completion) => completion.taskId === taskId,
      );
      // get the unique profileIds
      const uniqueProfileIds = [
        ...new Set(
          filteredCompletions?.map((completion) => completion.profileId),
        ),
      ];

      // profiles corresponding to the unique profileIds
      const profilesForTask = profiles.filter((profile) =>
        uniqueProfileIds.includes(profile.id),
      );

      const avatarList = profilesForTask.map((profile) => profile.avatar);
      state.avatars = avatarList;
    },
  },
});

export const {
  setTaskAsCompleted,
  findCompletionsByTaskId,
  findCompletionsByTaskIdAndCompletionDate,
  findCompletionsByTaskAndProfielId,
  findAllAvatarInCompletionByTaskId,
  findAllAvatarFortodayCompletionByTaskId,
} = taskCompletionSlice.actions;

//FRÅGA DAVID ÄR DETTA OK VERKLIGEN?
export const fetchCompletions =
  (householdId: string) => async (dispatch: any) => {
    const completions = await getTaskCompletionsFromDB(householdId);

    dispatch(taskCompletionSlice.actions.setCompletions(completions));
  };

export const taskCompletionReducer = taskCompletionSlice.reducer;
