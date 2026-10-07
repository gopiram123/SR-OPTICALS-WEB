import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// Exact Firebase configuration for the SR OPTICALS project
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDTGm63HgyE9ny6COSsLW80tsZ5IXDeGX4",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "sr-opticals.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "sr-opticals",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "sr-opticals.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "194428231543",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:194428231543:web:aa386d3f999c84a5790b72"
};

// Initialize Firebase App
export const app: FirebaseApp = getApps().length === 0 
  ? initializeApp(firebaseConfig) 
  : getApps()[0];

// Initialize Firebase Auth with persistent session
export const auth: Auth = getAuth(app);
try {
  setPersistence(auth, browserLocalPersistence).catch((err) => {
    console.warn("Unable to set browserLocalPersistence for auth:", err);
  });
} catch (e) {
  // Ignore in non-browser environment
}

// Initialize Cloud Firestore
export const db: Firestore = getFirestore(app);

export const isFirebaseConfigured = true;

export default app;
