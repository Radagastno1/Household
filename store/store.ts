import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { profileReducer } from "./profile/profileSlice";
import { taskReducer } from "./tasks/taskSlice";
import { userReducer } from "./user/userSlice";

// import { balanceReducer } from "./balanceSlice";
// import { userReducer } from "./userSlice";

const store = configureStore({
  reducer: {
    task: taskReducer,
    user: userReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
