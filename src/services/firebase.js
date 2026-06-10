import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const trimEnv = (value) => value?.trim();

const firebaseConfig = {
  apiKey: trimEnv(import.meta.env.VITE_FIREBASE_API_KEY) || "mock-key",
  authDomain: trimEnv(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN) || "mock-domain.firebaseapp.com",
  projectId: trimEnv(import.meta.env.VITE_FIREBASE_PROJECT_ID) || "mock-project",
  storageBucket: trimEnv(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET) || "mock-bucket.appspot.com",
  messagingSenderId: trimEnv(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID) || "00000000",
  appId: trimEnv(import.meta.env.VITE_FIREBASE_APP_ID) || "1:00000:web:000"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});
export const isFirebaseConfigured = !Object.values(firebaseConfig).some((value) => String(value).startsWith('mock-'));
