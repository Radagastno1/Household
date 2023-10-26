import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTGhNRoh6qXIoJ88wIijJ42QwVJPN2BhA",
  authDomain: "testbuzzter.firebaseapp.com",
  projectId: "testbuzzter",
  storageBucket: "testbuzzter.appspot.com",
  messagingSenderId: "83218627575",
  appId: "1:83218627575:web:07e9c3bd03c4944b1f8cf2",
  measurementId: "G-MG9SFCHSFW",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };

// const firebaseConfig = {
//   apiKey: "API-nyckel",
//   authDomain: "inget-authentication-krävs",
//   projectId: "testbuzzter",
//   storageBucket: "Ditt-storage-bucket.appspot.com",
//   messagingSenderId: "83218627575",
//   // appId: "app-id", // Detta är valfritt om du inte har det.
// };
