'use client';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { getFirebaseClient } from './firebase-client';
import { doc, setDoc } from 'firebase/firestore';

const { auth, db } = getFirebaseClient();

export interface AuthCredentials {
  email: string;
  password?: string;
}

export const signUp = async ({ email, password = '' }: AuthCredentials) => {
  if (!password) {
    throw new Error('Password is required for sign up.');
  }
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Create a user document in Firestore
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    displayName: user.email?.split('@')[0] || '',
    createdAt: new Date().toISOString(),
  });
  
  return userCredential;
};

export const signIn = async ({ email, password = '' }: AuthCredentials) => {
   if (!password) {
    throw new Error('Password is required for sign in.');
  }
  return signInWithEmailAndPassword(auth, email, password);
};

export const logOut = () => {
  return signOut(auth);
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
