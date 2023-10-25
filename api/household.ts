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
import { Household } from "../types";
import { app } from "./config";

const db = getFirestore(app);

export const addHouseholdToDB = async (household: Household) => {
  const householdCollectionRef = collection(db, "households");

  try {
    const docRef = await addDoc(householdCollectionRef, {});

    household.id = docRef.id;

    await updateDoc(docRef, household as Partial<Household>);

    const householdDoc = await getDoc(docRef);
    if (householdDoc.exists()) {
      const householdData = householdDoc.data();
      return householdData as Household;
    } else {
      console.error("Household document does not exist in the database.");
      return null;
    }
  } catch (error) {
    console.error("Error adding household:", error);
    return null;
  }
};

export const editHouseholdToDB = async (household: Household) => {
  console.log("hushåll som kommer in i edit: ", household)
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

export const getHouseholdsFromDB = async (householdId: string) => {
  try {
    const householdCollectionRef = collection(db, "households");

    const q = query(householdCollectionRef, where("id", "==", householdId));

    const querySnapshot = await getDocs(q);
    if (querySnapshot.size === 0) {
      return null;
    }

    const household = querySnapshot.docs[0].data() as Household;

    console.log("Uppgifter hämtade:", household);
    return household;
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

    console.log("Uppgifter hämtade:", households);
    return households;
  } catch (error) {
    console.error("Fel vid hämtning av uppgifter:", error);
  }
};

export const deleteHouseholdFromDB = async (householdId: string) => {
  try {
    const householdDocRef = doc(db, "households", householdId);
    await deleteDoc(householdDocRef);

    console.log("Household borttagen med Id:", householdId);
  } catch (error) {
    console.error("Fel vid borttagning av household:", error);
  }
};
// Function to check if a household with the entered code exists
export const checkHouseholdWithCode = async (joinCode: string) => {
  const householdCollectionRef = collection(db, "households");
  const q = query(householdCollectionRef, where("code", "==", joinCode));

  // const querySnapshot = await getDocs(q);
  // const householdDoc = await getDoc(q);
  const querySnapshot = await getDocs(q);
  if (querySnapshot.size === 0) {
    console.error("Household not found with ID:", joinCode);
    return null;
  }
  const householdData = querySnapshot.docs[0].data() as Household;
  console.log(householdData);

  if (householdData) {
    // Household with the entered code exists
    return householdData;

    // return households;
  } else {
    console.log("Household does not exist");
    return null;
  }
};


// import { addDoc, collection, getFirestore } from "firebase/firestore";
// import { app } from "./config";

// const db = getFirestore(app);

// // Function to add a new household to Firestore
// export const addHousehold = async (name: string, code: string) => {
//   try {
//     // Reference to the "households" collection
//     const householdsRef = collection(db, "households");

//     // Add a new document with household details
//     const docRef = await addDoc(householdsRef, {
//       name: name,
//       code: code,
//     });

//     // Get the generated ID from Firestore
//     const householdId = docRef.id;

//     const updatedHouseholdData = {
//       id: householdId,
//       name: name,
//       code: code,
//     };

//     return updatedHouseholdData;
//   } catch (error) {
//     console.error("Error adding household to Firestore:", error);
//     throw error;
//   }
// };
