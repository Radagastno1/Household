import "firebase/firestore";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { Household } from "../types";
import { app } from "./config";

const db = getFirestore(app);

export const addHouseholdToDB = async (householdName: string) => {
  const householdCollectionRef = collection(db, "households");
  const randomCode = generateHouseholdCode();

  try {
    const docRef = await addDoc(householdCollectionRef, {
      name: householdName,
      code: randomCode,
    });

    const householdId = docRef.id;

    const createdHousehold = {
      id: householdId,
      name: householdName,
      code: randomCode,
    };

    await setDoc(doc(db, "households", householdId), createdHousehold);

    return createdHousehold;
  } catch (error) {
    console.error("Error adding household:", error);
    return null;
  }
};

export const editHouseholdToDB = async (household: Household) => {
  const householdCollectionRef = collection(db, "households");

  try {
    const householdRef = doc(householdCollectionRef, household.id);

    const updatedHouseholdData = {
      id: household.id,
      name: household.name,
      code: household.code,
    };

    await updateDoc(householdRef, updatedHouseholdData);

    return household;
  } catch (error) {
    console.error("Fel vid redigering av uppgift:", error);
    return null;
  }
};

export const getHouseholdsFromDB = async (householdIds: string[]) => {
  const householdCollectionRef = collection(db, "households");

  const q = query(householdCollectionRef, where("id", "in", householdIds));
  const querySnapshot = await getDocs(q);

  const households: Household[] = [];
  querySnapshot.forEach((doc) => {
    households.push(doc.data() as Household);
  });

  return households;
};
export const getHouseholdsFromDBbySingleProfileId = async (
  profileId: string,
) => {
  try {
    const householdCollectionRef = collection(db, "households");

    const q = query(householdCollectionRef, where("id", "==", profileId));

    const querySnapshot = await getDocs(q);

    const households: Household[] = [];

    querySnapshot.forEach((doc) => {
      households.push(doc.data() as Household);
    });

    return households;
  } catch (error) {
    console.error("Fel vid hämtning av uppgifter:", error);
  }
};
export const getHouseholdsFromDBbyProfileId = async (profileId: string[]) => {
  try {
    const householdCollectionRef = collection(db, "households");

    const q = query(householdCollectionRef, where("id", "==", profileId));

    const querySnapshot = await getDocs(q);

    const households: Household[] = [];

    querySnapshot.forEach((doc) => {
      households.push(doc.data() as Household);
    });
    return households;
  } catch (error) {
    console.error("Fel vid hämtning av uppgifter:", error);
  }
};

export const deleteHouseholdFromDB = async (householdId: string) => {
  try {
    const householdDocRef = doc(db, "households", householdId);
    await deleteDoc(householdDocRef);
  } catch (error) {
    console.error("Fel vid borttagning av household:", error);
  }
};
export const checkHouseholdWithCode = async (joinCode: string) => {
  const householdCollectionRef = collection(db, "households");
  const q = query(householdCollectionRef, where("code", "==", joinCode));

  const querySnapshot = await getDocs(q);
  if (querySnapshot.size === 0) {
    return null;
  }
  const householdData = querySnapshot.docs[0].data() as Household;

  if (householdData) {
    return householdData;
  } else {
    return null;
  }
};

const generateHouseholdCode = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const code =
    getRandomElement(letters) +
    getRandomElement(letters) +
    getRandomElement(letters) +
    getRandomElement(numbers) +
    getRandomElement(numbers);
  return code;
};

const getRandomElement = (array: string) => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};
