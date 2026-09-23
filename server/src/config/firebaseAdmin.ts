import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

let isFirebaseAdminInitialized = false;

try {
  if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
    });
    isFirebaseAdminInitialized = true;
    console.info('🔥 Firebase Admin SDK initialized successfully.');
  } else {
    console.info('ℹ️ Firebase credentials not provided in server env. Running with high-performance local store adapter.');
  }
} catch (error) {
  console.warn('⚠️ Could not initialize Firebase Admin SDK:', error);
}

export const firebaseAdmin = isFirebaseAdminInitialized ? admin : null;
export const firestore = isFirebaseAdminInitialized ? admin.firestore() : null;
export const authAdmin = isFirebaseAdminInitialized ? admin.auth() : null;
export const storageAdmin = isFirebaseAdminInitialized ? admin.storage() : null;
