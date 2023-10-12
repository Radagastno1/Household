import { Task } from "../../types";

export interface TaskState {
  tasks: Task[];
}

export const initialState: TaskState = {
  tasks: [
    {
      id: "task1",
      title: "Damma vardagsrummet",
      description: "Damma vardagsrummets ytor",
      energiWeight: 4,
      creatingDate: new Date("2023-10-01"), //default blir dagens datum
      interval: 5, //dagar emellan?
      householdId: "household1",
    },
  ],
};
