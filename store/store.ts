import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { profileReducer } from "./profile/profileSlice";
import { taskReducer } from "./tasks/taskSlice";
import userAuthReducer from "./user/userAuthSlice";
import { userReducer } from "./user/userSlice";
import { taskCompletionReducer } from "./taskCompletionSlice";
import { userAccountReducer } from "./user/userAccountSlice";


const store = configureStore({
  reducer: {
    task: taskReducer,
    profile: profileReducer,
    userAuth: userAuthReducer,
    taskCompletion: taskCompletionReducer,
    userAccount: userAccountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
