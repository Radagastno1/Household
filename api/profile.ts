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
import { Profile } from "../types";
import { db } from "./config";

export const addProfileToDB = async (profile: Profile) => {
  const profileCollectionRef = collection(db, "profiles");

  try {
    const docRef = await addDoc(profileCollectionRef, {});

    profile.id = docRef.id;

    await updateDoc(docRef, profile as Partial<Profile>);

    const profileDoc = await getDoc(docRef);
    if (profileDoc.exists()) {
      const profileData = profileDoc.data();
      return profileData as Profile;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const saveProfileNameToDatabase = async (
  profileId: string,
  newProfileName: string,
) => {
  const profileDocRef = doc(db, "profiles", profileId);

  try {
    await updateDoc(profileDocRef, {
      profileName: newProfileName,
    });

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
  return profiles;
};

export const getAllProfilesByHouseholdId = async (householdId: string) => {
  try {
    const profileCollectionRef = collection(db, "profiles");

    const q = query(
      profileCollectionRef,
      where("householdId", "==", householdId),
      where("isActive", "==", true),
    );

    const querySnapshot = await getDocs(q);

    const profiles: Profile[] = [];

    querySnapshot.forEach((doc) => {
      profiles.push(doc.data() as Profile);
    });
    return profiles;
  } catch (error) {
    console.error("Fel vid hämtning av uppgifter:", error);
  }
};

export const getAllProfilesByUserIdFromDb = async (userId: string) => {
  try {
    const profileCollectionRef = collection(db, "profiles");

    const q = query(
      profileCollectionRef,
      where("userId", "==", userId),
      where("isActive", "==", true),
    );

    const querySnapshot = await getDocs(q);

    const profiles: Profile[] = [];

    querySnapshot.forEach((doc) => {
      profiles.push(doc.data() as Profile);
    });

    return profiles;
  } catch (error) {
    console.error("Fel vid hämtning av uppgifter:", error);
  }
};
export const editProfileToDB = async (profile: Profile) => {
  const profileCollectionRef = collection(db, "profiles");

  try {
    const profileRef = doc(profileCollectionRef, profile.id);

    const updatedProfileData = {
      id: profile.id,
      profileName: profile.profileName,
      userId: profile.userId,
      householdId: profile.householdId,
      avatar: profile.avatar,
      isOwner: profile.isOwner,
      isActive: profile.isActive,
    };

    await updateDoc(profileRef, updatedProfileData);

    return profile;
  } catch (error) {
    console.error("Fel vid redigering av uppgift:", error);
    return null;
  }
};
export const deactivateProfileInDB = async (profileId: string) => {
  const profileDocRef = doc(db, "profiles", profileId);

  try {
    await updateDoc(profileDocRef, {
      isActive: false,
    });

    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating profile in Firestore:", error);
      return { success: false, error: error.message };
    } else {
      console.error(
        "Unknown error occurred while updating profile in Firestore.",
      );
      return { success: false, error: "Unknown error" };
    }
  }
};
