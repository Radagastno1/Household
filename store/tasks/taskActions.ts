export interface AddTaskAction {
  type: "ADD_TASK";
  payload: string;
}

export type TaskAction = AddTaskAction;
