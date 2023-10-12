import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineReducers, legacy_createStore as createStore } from "redux";
import taskReducer from "./tasks/taskReducer";

const reducer = combineReducers({
  taskSlice: taskReducer,
  //här stoppar man in sin reducer tex user:userReducer
});

export const store = createStore(reducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
