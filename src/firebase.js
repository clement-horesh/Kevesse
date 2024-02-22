// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAH9lwcfXgNLGi1iL68HmqqWJKskZuHvOU",
  authDomain: "kevesse-53c0e.firebaseapp.com",
  databaseURL: "https://kevesse-53c0e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kevesse-53c0e",
  storageBucket: "kevesse-53c0e.appspot.com",
  messagingSenderId: "626180698558",
  appId: "1:626180698558:web:5aea0f2f899870ede089ef",
  measurementId: "G-NHVVCJKGR9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optionally you can enable analytics if it's part of your project
const analytics = getAnalytics(app);

// Get a Firestore instance
const db = getFirestore(app);

// Get a Firebase Storage instance
const storage = getStorage(app);

export { app, db, storage, analytics };
