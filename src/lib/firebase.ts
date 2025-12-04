// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/**
 * Firebase configuration
 * Uses environment variables in production or falls back to default values in development
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCUIm5P7z3sgmfxxESksDC32eSjsvfeKb0",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "expresvny-navigtor.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "expresvny-navigtor",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "expresvny-navigtor.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "981057554742",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:981057554742:web:20df894353c4556f274b97",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
};

/**
 * Initialize Firebase
 * Ensures only one instance of Firebase is created
 */
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

/**
 * Firebase Authentication instance
 */
const auth = getAuth(app);

/**
 * Firestore Database instance
 */
const db = getFirestore(app);

export { app, auth, db };
