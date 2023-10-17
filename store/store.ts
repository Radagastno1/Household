import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { profileReducer } from "./profile/profileSlice";
import { taskReducer } from "./tasks/taskSlice";
import userAuthReducer from "./user/userAuthSlice";
import { userReducer } from "./user/userSlice";

const store = configureStore({
  reducer: {
    task: taskReducer,
    user: userReducer,
    profile: profileReducer,
    userAuth: userAuthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
