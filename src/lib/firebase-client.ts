// IMPORTANT: This file should be used in client components only.
'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { firebaseConfig } from "./firebase";

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

// Initialize Firebase only on the client side
if (typeof window !== 'undefined' && !getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} else if (typeof window !== 'undefined') {
  app = getApp();
  auth = getAuth(app);
  db = getFirestore(app);
}

/**
 * Returns the client-side Firebase instances.
 * This function ensures that Firebase is initialized only once.
 * IMPORTANT: This should only be called from client components.
 */
export function getFirebaseClient() {
  // This is a bit of a trick to make sure the variables are initialized
  // in the browser before they are used.
  if (!app) {
     if (getApps().length) {
        app = getApp();
     } else {
        app = initializeApp(firebaseConfig);
     }
     auth = getAuth(app);
     db = getFirestore(app);
  }
  return { app, auth, db };
}
