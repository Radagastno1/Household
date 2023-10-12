import { Task } from "../../types";

export interface TaskState {
  tasks: Task[];
}

export const initialState: TaskState = {
  tasks: [],
};
