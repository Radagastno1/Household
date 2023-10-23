import "firebase/firestore";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { households } from "../data";
import { Household} from "../types";
import { app } from "./config";

const db = getFirestore(app);

export const addHouseholdtoDB = async (household: Household) => {
    try {
      const householdCollectionRef = collection(db, "households");
  
      const docRef = await addDoc(householdCollectionRef, household);
  
      console.log("Hushållet har lagts till i databasen.");
    } catch (error) {
      console.error("Fel vid tillägg av hushåll:", error);
    }
  };

export const getAllHouseholdsByUserId = async (userId: string) => {
    try {
    const householdCollectionRef = collection(db, "households");

    const q = query(
        householdCollectionRef,
        where("userId", "==", userId),
    );

    const querySnapshot = await getDocs(q);

    const households: Household[] = [];

    querySnapshot.forEach((doc) => {
        households.push(doc.data() as Household);
    });

    console.log("Hushåll hämtade:", households);
    return households;
    } catch (error) {
    console.error("Fel vid hämtning av uppgifter:", error);
    }
};
