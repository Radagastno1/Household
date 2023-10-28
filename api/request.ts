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
      where("status", "==", "pending"),
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

export const acceptProfileToHousehold = async (requestId: string) => {
  const requestDocRef = doc(db, "requests", requestId);

  try {
    await updateDoc(requestDocRef, {
      status: "approved",
    });
    const requestSnapshot = await getDoc(requestDocRef);
    const requestData = requestSnapshot.data();

    if (requestData && requestData.profileId) {
      const profileDocRef = doc(db, "profiles", requestData.profileId);
      await updateDoc(profileDocRef, {
        householdId: requestData.householdId,
      });
      console.log("profilen har uppdaterats med det nya hushållet.");
    } else {
      console.log("förfrågan saknar profilens id.");
    }

    return { success: true };
  } catch (error) {
    console.error("Fel vid uppdatering av hushållsidt i databasen:", error);
    return { success: false, error };
  }
};
