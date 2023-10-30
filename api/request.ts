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
      return requestDoc;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const deleteProfileWithRequestToDB = async (requestId: string) => {
  const profileCollectionRef = collection(db, "profiles");
  const requestCollectionRef = collection(db, "requests");

  try {
    const requestQuery = query(
      requestCollectionRef,
      where("id", "==", requestId),
    );
    const requestSnapshot = await getDocs(requestQuery);

    if (requestSnapshot.size === 0) {
      return null;
    } else {
      const requestData = requestSnapshot.docs[0].data() as HouseholdRequest;

      await deleteDoc(doc(requestCollectionRef, requestData.id));

      const profileQuery = query(
        profileCollectionRef,
        where("id", "==", requestData.profileId),
      );
      const profileSnapshot = await getDocs(profileQuery);

      if (profileSnapshot.size === 0) {
        return null;
      } else {
        await deleteDoc(doc(profileCollectionRef, requestData.profileId));
      }
    }
  } catch (error) {
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
