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
    console.log(todaysDate);
    console.log(startOfLastMonth);
    const startTimestamp = Timestamp.fromDate(new Date(startOfLastMonth));
    const endTimestamp = Timestamp.fromDate(new Date(todaysDate));

    const q = query(
      taskCompletionCollectionRef,
      where("householdId", "==", householdId),
      where("completedTimestamp", ">=", startTimestamp), // hämtar ut data mellan två datum
      where("completedTimestamp", "<=", endTimestamp),
    );
    console.log(startTimestamp);

    const querySnapshot = await getDocs(q);

    const taskCompletions: TaskCompletion[] = [];

    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      const taskCompletionWithoutTimestamp: Omit<
        TaskCompletion,
        "completedTimestamp"
      > = {
        // för att inte redux ska gnälla pga det nya fältet skapas en TaskCompletion utan timestamp-fältet innan det pushas till statet
        id: docData.id,
        householdId: docData.householdId,
        taskId: docData.taskId,
        profileId: docData.profileId,
        completionDate: docData.completionDate,
      };
      taskCompletions.push(taskCompletionWithoutTimestamp);
      console.log("taskCOMLETIONS------------------------", taskCompletions);
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

    // Loopa igenom resultatet och radera varje post
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
      console.log(`raderade task completion med id: ${doc.id}`);
    });

    console.log(`raderade alla task completions med taskId: ${taskId}`);
  } catch (error) {
    console.error("fel vid radering av task completions:", error);
  }
};

// export const deleteTaskFromDB = async (taskId: string) => {
//   //sen ska jag ta bort taskcompletions med??
//   try {
//     const taskDocRef = doc(db, "tasks", taskId);
//     await deleteDoc(taskDocRef);

//     console.log("Task borttagen med Id:", taskId);
//   } catch (error) {
//     console.error("Fel vid borttagning av tasken:", error);
//   }
// };

function addTimestampToTaskCompletion(taskCompletion: TaskCompletion) {
  const completionDateStr = taskCompletion.completionDate;
  const completionDate = new Date(completionDateStr);
  completionDate.setHours(0, 0, 0, 0); // Ställ in tiden på midnatt

  const timestamp = Timestamp.fromDate(completionDate);

  // Skapar en kopia av taskCompletion med completedTimestamp
  const taskCompletionWithTimestamp = {
    ...taskCompletion,
    completedTimestamp: timestamp,
  };

  return taskCompletionWithTimestamp;
}
