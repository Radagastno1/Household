import "firebase/firestore";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
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

    console.log("Task tillagd med Id:", taskRef.id);
  } catch (error) {
    console.error("Fel vid tillägg av task:", error);
  }
};

export const editTaskToDB = async (task: Task) => {
  try {
    const taskDocRef = doc(db, "tasks", task.id);

    await updateDoc(taskDocRef, {
      title: task.title,
      description: task.description,
      energiWeight: task.energiWeight,
      creatingDate: task.creatingDate,
      interval: task.interval,
      householdId: task.householdId,
    });

    console.log("Task redigerad med Id:", task.id);
  } catch (error) {
    console.error("Fel vid redigering av tasks:", error);
  }
};

export const getTasksFromDB = async (householdId: string) => {
  try {
    const taskCollectionRef = collection(db, "tasks");

    const q = query(taskCollectionRef, where("householdId", "==", householdId));

    const querySnapshot = await getDocs(q);

    const tasks: Task[] = [];

    querySnapshot.forEach((doc) => {
      tasks.push(doc.data() as Task);
    });

    console.log("Uppgifter hämtade:", tasks);
    return tasks;
  } catch (error) {
    console.error("Fel vid hämtning av uppgifter:", error);
  }
};

export const deleteTaskFromDB = async (taskId: string) => {
  //sen ska jag ta bort taskcompletions med??
  try {
    const taskDocRef = doc(db, "tasks", taskId);
    await deleteDoc(taskDocRef);

    console.log("Task borttagen med Id:", taskId);
  } catch (error) {
    console.error("Fel vid borttagning av tasken:", error);
  }
};
