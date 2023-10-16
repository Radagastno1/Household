import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { profileReducer } from "./profile/profileSlice";
import { taskReducer } from "./tasks/taskSlice";
import { userAccountReducer } from "./user/userAccountSlice";

const store = configureStore({
  reducer: {
    task: taskReducer,
    profile: profileReducer,
    userAccount: userAccountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
