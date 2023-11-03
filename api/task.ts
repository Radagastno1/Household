import "firebase/firestore";
import {
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
import { Task } from "../types";
import { db } from "./config";

export const addTaskToDB = async (task: Task) => {
  const taskCollectionRef = collection(db, "tasks");

  try {
    const docRef = await addDoc(taskCollectionRef, {});

    task.id = docRef.id;

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
   throw error;
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

    return tasks;
  } catch (error) {
    throw error;
  }
};

export const deleteTaskFromDB = async (taskId: string) => {
  try {
    const taskDocRef = doc(db, "tasks", taskId);
    await deleteDoc(taskDocRef);
  } catch (error) {
    throw error;
  }
};
