import "firebase/firestore";
import { addDoc, collection, doc, getFirestore } from "firebase/firestore";
import { Task } from "../types";
import { app } from "./config";

const db = getFirestore(app);

//doc först  - skapa dokumentet för idt först
//sen i docRef.id får man idt
//sen add - det dokument id blir id i fältet

export const addTaskToDB = async (task: Task) => {
  task.householdId = "fYHVLNiQvWEG9KNUGqBT";

  const taskCollectionRef = collection(db, "tasks");

  try {
    const docRef = await doc(taskCollectionRef);
    //sätt docRef.id till task id
    task.id = docRef.id;

    const taskRef = await addDoc(taskCollectionRef, task);

    console.log("Uppgift tillagd med ID:", taskRef.id);
  } catch (error) {
    console.error("Fel vid tillägg av uppgift:", error);
  }
};
