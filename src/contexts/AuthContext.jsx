/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '../services/firebase';

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

export { useAuth };

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const requireFirebase = () => {
    if (!isFirebaseConfigured) {
      throw new Error('Firebase is not configured for this build.');
    }
  };

  const signup = (email, password) => {
    requireFirebase();
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    requireFirebase();
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    requireFirebase();
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    requireFirebase();
    return signOut(auth);
  };

  const value = {
    currentUser,
    signup,
    login,
    loginWithGoogle,
    logout,
    isFirebaseConfigured,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
