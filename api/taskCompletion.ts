import "firebase/firestore";
import {
  Timestamp,
  addDoc,
  collection,
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

    console.log(
      "Dokumentreferens id:",
      docRef.id,
      " och task completions id:",
      taskCompletion.id,
    );

    await updateDoc(
      docRef,
      taskCompletionWithTimestamp as Partial<TaskCompletion>,
    );

    const taskDoc = await getDoc(docRef);
    if (taskDoc.exists()) {
      const taskData = taskDoc.data();
      return taskData as TaskCompletion;
    } else {
      console.error("Uppgiftsdokumentet finns inte i databasen.");
      return null;
    }
  } catch (error) {
    console.error("Fel vid tillägg av taskcompletion:", error);
    return null;
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
    });

    console.log("Antal Task completions hämtade:", taskCompletions.length);
    console.log("Task completions hämtade:", taskCompletions);
    return taskCompletions;
  } catch (error) {
    console.error("Fel vid hämtning av task completions:", error);
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
