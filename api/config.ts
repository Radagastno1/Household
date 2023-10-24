import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "API-nyckel",
  authDomain: "inget-authentication-krävs",
  projectId: "testbuzzter",
  storageBucket: "Ditt-storage-bucket.appspot.com",
  messagingSenderId: "83218627575",
  // appId: "app-id", // Detta är valfritt om du inte har det.
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
