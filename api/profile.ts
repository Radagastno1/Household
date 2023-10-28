import "firebase/firestore";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { HouseholdRequest, Profile } from "../types";
import { db } from "./config";

export const addProfileToDB = async (profile: Profile) => {
  const profileCollectionRef = collection(db, "profiles");

  try {
    const docRef = await addDoc(profileCollectionRef, {});

    profile.id = docRef.id;

    console.log(
      "Dokumentreferens id:",
      docRef.id,
      " och profilens id:",
      profile.id,
    );

    await updateDoc(docRef, profile as Partial<Profile>);

    const profileDoc = await getDoc(docRef);
    if (profileDoc.exists()) {
      const profileData = profileDoc.data();
      return profileData as Profile;
    } else {
      console.error("Uppgiftsdokumentet finns inte i databasen.");
      return null;
    }
  } catch (error) {
    console.error("Fel vid tillägg av profil:", error);
    return null;
  }
};

export const addProfileWithRequestToDB = async (
  profile: Profile,
  request: HouseholdRequest,
) => {
  const profileCollectionRef = collection(db, "profiles");
  const requestCollectionRef = collection(db, "requests");

  try {
    const docProfileRef = await addDoc(profileCollectionRef, {});

    profile.id = docProfileRef.id;

    console.log(
      "Dokumentreferens id:",
      docProfileRef.id,
      " och profilens id:",
      profile.id,
    );

    await updateDoc(docProfileRef, profile as Partial<Profile>);
    const profileDoc = await getDoc(docProfileRef);
    if (profileDoc.exists()) {
      const profileData = profileDoc.data();
      console.log("profilen som skapades i databasen: ", profileData);

      const docRequestRef = await addDoc(requestCollectionRef, {});
      request.id = docRequestRef.id;
      request.profileId = profile.id;

      await updateDoc(docRequestRef, request as Partial<HouseholdRequest>);
      const requestDoc = await getDoc(docRequestRef);
      console.log("förfrågan som skapades i databasen: ", requestDoc);
      return requestDoc;
    } else {
      console.error("Uppgiftsdokumentet finns inte i databasen.");
      return null;
    }
  } catch (error) {
    console.error("Fel vid tillägg av profil:", error);
    return null;
  }
};

export const getRequestByHouseholdIdFromDb = async (householdId: string) => {
  try {
    const requestCollectionRef = collection(db, "requests");

    const q = query(
      requestCollectionRef,
      where("householdId", "==", householdId),
    );

    const querySnapshot = await getDocs(q);

    const requests: HouseholdRequest[] = [];

    querySnapshot.forEach((doc) => {
      requests.push(doc.data() as HouseholdRequest);
    });

    console.log("Förfrågningar hämtade:", requests);
    return requests as HouseholdRequest[];
  } catch (error) {
    console.error("Fel vid uppdatering av hushållsidt i databasen:", error);
    return [];
  }
};

export const acceptProfileToHousehold = async (
  requestId: string,
  householdId: string,
) => {
  const requestDocRef = doc(db, "requests", requestId);

  try {
    //uppdaterar hushållsidt
    await updateDoc(requestDocRef, {
      householdId: householdId,
    });

    console.log("hushållsidt har uppdaterats i databasen.");
    return { success: true };
  } catch (error) {
    console.error("Fel vid uppdatering av hushållsidt i databasen:", error);
    return { success: false, error };
  }
};

export const saveProfileNameToDatabase = async (
  profileId: string,
  newProfileName: string,
) => {
  const profileDocRef = doc(db, "profiles", profileId);

  try {
    // Uppdatera profilnamnet i Firestore-dokumentet
    await updateDoc(profileDocRef, {
      profileName: newProfileName,
    });

    console.log("Profilnamnet har uppdaterats i databasen.");
    return { success: true };
  } catch (error) {
    console.error("Fel vid uppdatering av profilnamnet i databasen:", error);
    return { success: false, error };
  }
};

export const getAllProfilesByHouseholdIdDb = async (householdId: string) => {
  const profileCollectionRef = collection(db, "profiles");

  const q = query(
    profileCollectionRef,
    where("householdId", "==", householdId),
  );

  const querySnapshot = await getDocs(q);

  const profiles: Profile[] = [];

  querySnapshot.forEach((doc) => {
    profiles.push(doc.data() as Profile);
  });

  console.log("profiler hämtade från DB:", profiles);
  return profiles;
};

//DENNA BEHÖVS NOG INTE DÅ VI HÄMTAR ALLA EN GÅNG
// export const getProfileByHouseholdAndUser = async (
//   householdId: string,
//   userId: string,
// ) => {
//   try {
//     const profileCollectionRef = collection(db, "profiles");

//     const q = query(
//       profileCollectionRef,
//       where("householdId", "==", householdId),
//       where("userId", "==", userId),
//     );

//     const querySnapshot = await getDocs(q);

//     if (!querySnapshot.empty) {
//       const profileDoc = querySnapshot.docs[0];
//       const profile = profileDoc.data() as Profile;

//       console.log("aktiva profilen hämtad:", profile);
//       return profile;
//     } else {
//       console.error("Ingen profil hittades.");
//       return null;
//     }
//   } catch (error) {
//     console.error("Error vid hämtning av aktiva profilen:", error);
//     throw error;
//   }
// };

export const getAllProfilesByHouseholdId = async (householdId: string) => {
  try {
    const profileCollectionRef = collection(db, "profiles");

    const q = query(
      profileCollectionRef,
      where("householdId", "==", householdId),
    );

    const querySnapshot = await getDocs(q);

    const profiles: Profile[] = [];

    querySnapshot.forEach((doc) => {
      profiles.push(doc.data() as Profile);
    });

    console.log("Profiler hämtade:", profiles);
    return profiles;
  } catch (error) {
    console.error("Fel vid hämtning av uppgifter:", error);
  }
};

export const getAllProfilesByUserIdFromDb = async (userId: string) => {
  try {
    console.log("Hämta profiler: ", userId);

    const profileCollectionRef = collection(db, "profiles");

    const q = query(profileCollectionRef, where("userId", "==", userId));

    const querySnapshot = await getDocs(q);

    const profiles: Profile[] = [];

    querySnapshot.forEach((doc) => {
      profiles.push(doc.data() as Profile);
    });

    console.log("Profiler hämtade:", profiles);
    return profiles;
  } catch (error) {
    console.error("Fel vid hämtning av uppgifter:", error);
  }
};

// export const editTaskToDB = async (task: Task) => {
//   task.householdId = "fYHVLNiQvWEG9KNUGqBT";
//   const taskCollectionRef = collection(db, "tasks");

//   try {
//     const taskRef = doc(taskCollectionRef, task.id);

//     const updatedTaskData = {
//       id: task.id,
//       title: task.title,
//       description: task.description,
//       energiWeight: task.energiWeight,
//       creatingDate: task.creatingDate,
//       interval: task.interval,
//       householdId: task.householdId,
//     };

//     await updateDoc(taskRef, updatedTaskData);

//     return task;
//   } catch (error) {
//     console.error("Fel vid redigering av uppgift:", error);
//     return null;
//   }
// };

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
