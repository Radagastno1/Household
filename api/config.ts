import { initializeApp } from "firebase/app";
// import { getAuth, getReactNativePersistence } from "firebase/auth";
import * as firebaseAuth from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage, {
  AsyncStorageStatic,
} from "@react-native-async-storage/async-storage";

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
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });
const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;
const auth = initializeAuth(app, {
  persistence: reactNativePersistence(ReactNativeAsyncStorage),
});

export { app, db, auth };
