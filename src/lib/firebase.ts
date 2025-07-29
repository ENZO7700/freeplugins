// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "expresvny-navigtor",
  "appId": "1:981057554742:web:20df894353c4556f274b97",
  "storageBucket": "expresvny-navigtor.firebasestorage.app",
  "apiKey": "AIzaSyCUIm5P7z3sgmfxxESksDC32eSjsvfeKb0",
  "authDomain": "expresvny-navigtor.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "981057554742"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
