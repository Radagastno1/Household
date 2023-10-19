import "firebase/firestore";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { Task } from "../types";
import { app } from "./config";

const db = getFirestore(app);

interface TaskData {
  title: string;
  description: string;
  energiWeight: number;
  creatingDate: string;
  interval: number;
  householdId: string;
}

function mapTaskToTaskDat(task: Task) {
  const newTaskData: TaskData = {
    title: task.title,
    description: task.description,
    energiWeight: task.energiWeight,
    creatingDate: task.creatingDate,
    interval: task.interval,
    householdId: "fYHVLNiQvWEG9KNUGqBT",
  };
  return newTaskData;
}

export const addTaskToDB = async (task: Task) => {
  const taskCollectionRef = collection(db, "tasks");

  try {
    const taskRef = await addDoc(taskCollectionRef, mapTaskToTaskDat(task));
    console.log("Uppgift tillagd med ID:", taskRef.id);
  } catch (error) {
    console.error("Fel vid tillägg av uppgift:", error);
  }
};
