import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import appReducer from "./appSlice";
import { profileReducer } from "./profile/profileSlice";
import { taskCompletionReducer } from "./taskCompletionSlice";
import { taskReducer } from "./tasks/taskSlice";
import { userAccountReducer } from "./user/userAccountSlice";
import userAuthReducer from "./user/userAuthSlice";

const store = configureStore({
  reducer: {
    task: taskReducer,
    profile: profileReducer,
    userAuth: userAuthReducer,
    taskCompletion: taskCompletionReducer,
    userAccount: userAccountReducer,
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
