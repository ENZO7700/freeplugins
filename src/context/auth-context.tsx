'use client';

import * as React from 'react';
import {
  User,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { signIn as firebaseSignIn, signUp as firebaseSignUp, logOut as firebaseSignOut } from '@/lib/auth-service';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  signup: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  updateUserProfile: (profile: { displayName?: string; photoURL?: string }) => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  const login = async (email: string, password: string): Promise<any> => {
    return firebaseSignIn({ email, password });
  }

  const signup = async (email: string, password: string): Promise<any> => {
    return firebaseSignUp({ email, password });
  }

  const logout = async (): Promise<void> => {
    return firebaseSignOut();
  };

  const updateUserProfile = async (profile: { displayName?: string; photoURL?: string }) => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, profile);
      // Manually update the user state to reflect changes immediately
      setUser({ ...auth.currentUser });
    } else {
      throw new Error("No user is signed in to update the profile.");
    }
  };


  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateUserProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
