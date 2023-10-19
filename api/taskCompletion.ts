import "firebase/firestore";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { TaskCompletion } from "../types";
import { app } from "./config";

const db = getFirestore(app);
const taskCompletionCollectionRef = collection(db, "taskCompletions");

export const addTaskCompletionToDB = async (taskCompletion: TaskCompletion) => {
  try {
    const docRef = await addDoc(taskCompletionCollectionRef, {});

    taskCompletion.id = docRef.id;

    console.log(
      "Dokumentreferens id:",
      docRef.id,
      " och task completions id:",
      taskCompletion.id,
    );

    await updateDoc(docRef, taskCompletion as Partial<TaskCompletion>);

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

export const getTaskCompletionsFromDB = async (
  taskId: string,
  profileId: string,
) => {
  try {
    const q = query(
      taskCompletionCollectionRef,
      where("taskId", "==", taskId),
      where("profileId", "==", profileId),
    );

    const querySnapshot = await getDocs(q);

    const taskCompletions: TaskCompletion[] = [];

    querySnapshot.forEach((doc) => {
      taskCompletions.push(doc.data() as TaskCompletion);
    });

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
