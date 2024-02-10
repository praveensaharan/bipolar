// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDOiP_jCxNJGESO1ds-OFCkoZeGe7ciy1E",
  authDomain: "next-auth-cdc90.firebaseapp.com",
  projectId: "next-auth-cdc90",
  storageBucket: "next-auth-cdc90.appspot.com",
  messagingSenderId: "398359465058",
  appId: "1:398359465058:web:040428127d67ff72f1953b",
  measurementId: "G-XL7XNZ6DD0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
