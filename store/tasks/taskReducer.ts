import { TaskAction } from "./taskActions";
import { TaskState, initialState } from "./taskStates";

type KnownAction = TaskAction;

export default function taskReducer(
  state: TaskState = initialState,
  action: KnownAction,
) {
  switch (action.type) {
    case "ADD_TASK":
      const updatedTasks = [...state.tasks, action.payload];

      return {
        ...state,
        tasks: updatedTasks,
      };
    default: {
      action.type satisfies never;
      return state;
    }
  }
}
