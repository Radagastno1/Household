import { TaskAction } from "./taskActions";
import { TaskState, initialState } from "./taskStates";

type KnownAction = TaskAction;

export default function taskReducer(
  state: TaskState = initialState,
  action: KnownAction,
) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    default: {
      action.type satisfies never;
      return state;
    }
  }
}
