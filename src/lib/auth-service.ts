import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { app, db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

/**
 * Firebase Authentication instance
 */
const auth = getAuth(app);

/**
 * Authentication credentials interface
 */
export interface AuthCredentials {
  email: string;
  password?: string;
}

/**
 * Sign up a new user with email and password
 * Creates a user document in Firestore with basic profile information
 * 
 * @param credentials - User email and password
 * @returns Firebase UserCredential object
 * @throws Error if password is not provided or sign up fails
 * 
 * @example
 * ```ts
 * const userCredential = await signUp({ 
 *   email: 'user@example.com', 
 *   password: 'securePassword123' 
 * });
 * ```
 */
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

/**
 * Sign in an existing user with email and password
 * 
 * @param credentials - User email and password
 * @returns Firebase UserCredential object
 * @throws Error if password is not provided or credentials are invalid
 * 
 * @example
 * ```ts
 * const userCredential = await signIn({ 
 *   email: 'user@example.com', 
 *   password: 'securePassword123' 
 * });
 * ```
 */
export const signIn = async ({ email, password = '' }: AuthCredentials) => {
   if (!password) {
    throw new Error('Password is required for sign in.');
  }
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * Sign out the current user
 * Clears the authentication state
 * 
 * @returns Promise that resolves when sign out is complete
 * 
 * @example
 * ```ts
 * await logOut();
 * ```
 */
export const logOut = () => {
  return signOut(auth);
};

/**
 * Subscribe to authentication state changes
 * Callback is invoked whenever the user signs in or out
 * 
 * @param callback - Function to call when auth state changes
 * @returns Unsubscribe function to stop listening to auth changes
 * 
 * @example
 * ```ts
 * const unsubscribe = onAuthChange((user) => {
 *   if (user) {
 *     console.log('User signed in:', user.email);
 *   } else {
 *     console.log('User signed out');
 *   }
 * });
 * 
 * // Later, to stop listening:
 * unsubscribe();
 * ```
 */
export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
