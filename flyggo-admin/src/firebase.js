import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCRhwwl7N0HlS-nACLCJqiwmm_9dkTjrKM",
  authDomain: "flyggo-travels.firebaseapp.com",
  projectId: "flyggo-travels",
  storageBucket: "flyggo-travels.firebasestorage.app",
  messagingSenderId: "739424476726",
  appId: "1:739424476726:web:595e75514376db3359c297",
  measurementId: "G-F4NC4D6J9W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
