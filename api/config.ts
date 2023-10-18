import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  // apiKey: "API-nyckel",
  authDomain: "inget-authentication-krävs",
  projectId: "testbuzzter",
  storageBucket: "Ditt-storage-bucket.appspot.com",
  messagingSenderId: "83218627575",
  //   appId: "app-id",
};

export const app = firebase.initializeApp(firebaseConfig);
