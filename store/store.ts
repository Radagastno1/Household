import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import appReducer from "./appSlice";
import { householdReducer } from "./household/householdSlice";
import { profileReducer } from "./profile/profileSlice";
import { taskCompletionReducer } from "./taskCompletion/taskCompletionSlice";
import { taskReducer } from "./tasks/taskSlice";
import { userReducer } from "./user/userSlice";
import { requestReducer } from "./request/requestSlice";

const store = configureStore({
  reducer: {
    task: taskReducer,
    profile: profileReducer,
    taskCompletion: taskCompletionReducer,
    app: appReducer,
    household: householdReducer,
    user: userReducer,
    request: requestReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
