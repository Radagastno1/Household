import "firebase/firestore";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
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
  // task.householdId = "fYHVLNiQvWEG9KNUGqBT";

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
      console.error("Uppgiftsdokumentet finns inte i databasen.");
      return null;
    }
  } catch (error) {
    console.error("Fel vid tillägg av uppgift:", error);
    return null;
  }
};

export const editTaskToDB = async (task: Task) => {
  task.householdId = "fYHVLNiQvWEG9KNUGqBT";
  const taskCollectionRef = collection(db, "tasks");

  try {
    const taskRef = doc(taskCollectionRef, task.id);

    const updatedTaskData = {
      id: task.id,
      title: task.title,
      description: task.description,
      energiWeight: task.energiWeight,
      creatingDate: task.creatingDate,
      interval: task.interval,
      householdId: task.householdId,
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
