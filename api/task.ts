import "firebase/firestore";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Task, TaskCompletion } from "../types";
import { getCurrentDate, getLastMonthDates } from "../utils/DateHandler";
import { db } from "./config";

//doc först  - skapa dokumentet för idt först
//sen i docRef.id får man idt
//sen add - det dokument id blir id i fältet

export const addTaskToDB = async (task: Task) => {
  const taskCollectionRef = collection(db, "tasks");

  try {
    const docRef = await addDoc(taskCollectionRef, {});

    task.id = docRef.id;

    console.log(
      "Dokumentreferens id:",
      docRef.id,
      " och uppgiftens id:",
      task.id,
    );

    await updateDoc(docRef, task as Partial<Task>);

    const taskDoc = await getDoc(docRef);
    if (taskDoc.exists()) {
      const taskData = taskDoc.data();
      return taskData as Task;
    } else {
      return null;
    }
  } catch (error: any) {
    throw error;
  }
};

export const editTaskToDB = async (task: Task) => {
  const taskCollectionRef = collection(db, "tasks");

  try {
    const taskRef = doc(taskCollectionRef, task.id);

    const updatedTaskData = {
      id: task.id,
      title: task.title,
      description: task.description,
      energiWeight: task.energyWeight,
      creatingDate: task.creatingDate,
      interval: task.interval,
      householdId: task.householdId,
      isActive: task.isActive,
    };

    await updateDoc(taskRef, updatedTaskData);

    return task;
  } catch (error) {
    console.error("Fel vid redigering av uppgift:", error);
    return null;
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
