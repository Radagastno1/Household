import "firebase/firestore";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { TaskCompletion } from "../types";
import { getCurrentDate, getLastMonthDates } from "../utils/DateHandler";
import { db } from "./config";

const taskCompletionCollectionRef = collection(db, "taskCompletions");

export const addTaskCompletionToDB = async (taskCompletion: TaskCompletion) => {
  try {
    const taskCompletionWithTimestamp =
      addTimestampToTaskCompletion(taskCompletion);
    const docRef = await addDoc(taskCompletionCollectionRef, {});

    taskCompletionWithTimestamp.id = docRef.id;

    await updateDoc(
      docRef,
      taskCompletionWithTimestamp as Partial<TaskCompletion>,
    );

    const taskDoc = await getDoc(docRef);
    if (taskDoc.exists()) {
      const taskData = taskDoc.data();

      const taskCompletionWithoutTimestamp: Omit<
        TaskCompletion,
        "completedTimestamp"
      > = {
        id: taskData.id,
        householdId: taskData.householdId,
        taskId: taskData.taskId,
        profileId: taskData.profileId,
        completionDate: taskData.completionDate,
      };
      return taskCompletionWithoutTimestamp as TaskCompletion;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const getTaskCompletionsFromDB = async (householdId: string) => {
  try {
    const { todaysDate } = getCurrentDate();
    const { startOfLastMonth } = getLastMonthDates();

    const startTimestamp = Timestamp.fromDate(new Date(startOfLastMonth));
    const endTimestamp = Timestamp.fromDate(new Date(todaysDate));

    const q = query(
      taskCompletionCollectionRef,
      where("householdId", "==", householdId),
      where("completedTimestamp", ">=", startTimestamp),
      where("completedTimestamp", "<=", endTimestamp),
    );

    const querySnapshot = await getDocs(q);

    const taskCompletions: TaskCompletion[] = [];

    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      const taskCompletionWithoutTimestamp: Omit<
        TaskCompletion,
        "completedTimestamp"
      > = {
        
        id: docData.id,
        householdId: docData.householdId,
        taskId: docData.taskId,
        profileId: docData.profileId,
        completionDate: docData.completionDate,
      };
      taskCompletions.push(taskCompletionWithoutTimestamp);
    });
    return taskCompletions;
  } catch (error) {
    throw error;
  }
};

export const deleteAllTaskCompletionsByTaskId = async (taskId: string) => {
  try {
    const q = query(taskCompletionCollectionRef, where("taskId", "==", taskId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

  } catch (error) {
    console.error("fel vid radering av task completions:", error);
  }
};

function addTimestampToTaskCompletion(taskCompletion: TaskCompletion) {
  const completionDateStr = taskCompletion.completionDate;
  const completionDate = new Date(completionDateStr);
  completionDate.setHours(0, 0, 0, 0);

  const timestamp = Timestamp.fromDate(completionDate);

  const taskCompletionWithTimestamp = {
    ...taskCompletion,
    completedTimestamp: timestamp,
  };

  return taskCompletionWithTimestamp;
}
