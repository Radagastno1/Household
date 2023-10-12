import { Task } from "../../types";

export interface AddTaskAction {
  type: "ADD_TASK";
  payload: Task;
}

export type TaskAction = AddTaskAction;
