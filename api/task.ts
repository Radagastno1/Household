import * as firebase from "firebase/app";
import "firebase/firestore";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { Task } from "../types";

const firebaseConfig = {
  // apiKey: "API-nyckel",
  authDomain: "inget-authentication-krävs",
  projectId: "testbuzzter",
  storageBucket: "Ditt-storage-bucket.appspot.com",
  messagingSenderId: "83218627575",
  //   appId: "app-id",
};

const app = firebase.initializeApp(firebaseConfig);
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
    householdId: task.householdId,
  };
  return newTaskData;
}

export const addTask = async (task: Task) => {
  const taskCollectionRef = collection(db, "tasks");

  try {
    const taskRef = await addDoc(taskCollectionRef, mapTaskToTaskDat(task));
    console.log("Uppgift tillagd med ID:", taskRef.id);
  } catch (error) {
    console.error("Fel vid tillägg av uppgift:", error);
  }
};
