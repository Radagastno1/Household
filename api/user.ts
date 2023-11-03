import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "firebase/firestore";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { User, UserCreate } from "../types";
import { auth, db } from "./config";

export const addUserToDB = async (createUser: UserCreate) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      createUser.email,
      createUser.password,
    );
    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email ?? null,
    } satisfies User;
  } catch (error: any) {
    throw error;
  }
};

export const signInWithAPI = async (createUser: UserCreate) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      createUser.email,
      createUser.password,
    );
    return {
      uid: userCredential.user.uid,
      email: createUser.email,
    } as User;
  } catch (error: any) {
    throw error;
  }
};

export const deleteUserFromDB = async (userId: string) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await deleteDoc(userDocRef);
  } catch (error) {
    console.error("Fel vid borttagning av usern:", error);
  }
};

export const getUserByUserId = async (userId: string) => {
  try {
    const userCollectionRef = collection(db, "users");
    const userQuery = query(userCollectionRef, where("id", "==", userId));
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.size === 0) {
      console.error("User not found with ID:", userId);
      return null;
    }

    const userData = querySnapshot.docs[0].data() as User;
    return userData;
  } catch (error) {
    console.error("Error fetching user by userId:", error);
    return null;
  }
};
