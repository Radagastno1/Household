// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJWEmORR1VNn8w-aNcF0HCp30kwJLPsqI",
  authDomain: "buzzter-6f2a2.firebaseapp.com",
  projectId: "buzzter-6f2a2",
  storageBucket: "buzzter-6f2a2.appspot.com",
  messagingSenderId: "179592687787",
  appId: "1:179592687787:web:9269a9a710f50af5aa47ee",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
