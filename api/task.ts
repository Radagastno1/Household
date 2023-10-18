import * as firebase from "firebase/app";
import "firebase/firestore";
import { Task } from "../types";

// const firebaseConfig = {
//   apiKey: "Din API-nyckel",
//   authDomain: "Din-auth-domain.firebaseapp.com",
//   projectId: "Ditt-projekt-id",
//   storageBucket: "Ditt-storage-bucket.appspot.com",
//   messagingSenderId: "Ditt-messaging-sender-id",
//   appId: "Din-app-id",
// };

// firebase.initializeApp(firebaseConfig);

// const db = firebase.firestore();

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
    householdId: task.householdId,
  };
  return newTaskData;
}

export const addTask = async (task: Task) => {
  try {
    const taskDataToAdd = mapTaskToTaskDat(task);
    const taskRef = await db.collection("tasks").add(taskDataToAdd);
    console.log("Uppgift tillagd med ID:", taskRef.id);
    return taskRef.id;
  } catch (error) {
    console.error("Fel vid tillägg av uppgift:", error);
    throw error;
  }
};
