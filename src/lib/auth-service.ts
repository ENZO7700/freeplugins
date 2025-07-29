import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { app } from './firebase';

const auth = getAuth(app);

export interface AuthCredentials {
  email: string;
  password?: string;
}

export const signUp = async ({ email, password = '' }: AuthCredentials) => {
  if (!password) {
    throw new Error('Password is required for sign up.');
  }
  return createUserWithEmailAndPassword(auth, email, password);
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
