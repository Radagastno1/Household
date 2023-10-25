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
import { User } from "../types";
import { db } from "./config";

export const addUserToDB = async (user: User) => {
  const userCollectionRef = collection(db, "users");

  try {
    console.log("inne i tri i user.ts");
    const docRef = await addDoc(userCollectionRef, {});

    user.id = docRef.id;

    console.log(
      "Dokumentreferens id:",
      docRef.id,
      " och uppgiftens id:",
      user.id,
    );

    await updateDoc(docRef, user as Partial<User>);

    const userDoc = await getDoc(docRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData as User;
    } else {
      console.error("Uppgiftsdokumentet finns inte i databasen.");
      return null;
    }
  } catch (error) {
    console.error("Fel vid tillägg av uppgift:", error);
    return null;
  }
};

export const editUserToDB = async (user: User) => {
  user.householdId = "";
  const userCollectionRef = collection(db, "users");

  try {
    const userRef = doc(userCollectionRef, user.id);

    const updatedUserData = {
      id: user.id,
      name: user.name,
      password: user.password,
      username: user.username,
    };

    await updateDoc(userRef, updatedUserData);

    return user;
  } catch (error) {
    console.error("Fel vid redigering av uppgift:", error);
    return null;
  }
};

// export const getUsersFromDB = async (householdId: string) => {
//   try {
//     const userCollectionRef = collection(db, "users");

//     const q = query(userCollectionRef, where("householdId", "==", householdId));

//     const querySnapshot = await getDocs(q);

//     const users: User[] = [];

//     querySnapshot.forEach((doc) => {
//       users.push(doc.data() as User);
//     });

//     console.log("Uppgifter hämtade:", users);
//     return users; // Return an empty array when no users are found
//   } catch (error) {
//     console.error("Fel vid hämtning av uppgifter:", error);
//     return []; // Return an empty array in case of an error
//   }
// };
export const getUsersFromDB = async (username: string) => {
  try {
    const userCollectionRef = collection(db, "users");

    const q = query(userCollectionRef, where("username", "==", username));

    const querySnapshot = await getDocs(q);

    const users: User[] = [];

    querySnapshot.forEach((doc) => {
      users.push(doc.data() as User);
    });

    console.log("Uppgifter hämtade:", users);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};

export const deleteUserFromDB = async (userId: string) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await deleteDoc(userDocRef);

    console.log("User borttagen med Id:", userId);
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
    console.log("User data retrieved:", userData);
    return userData;
  } catch (error) {
    console.error("Error fetching user by userId:", error);
    return null;
  }
};
