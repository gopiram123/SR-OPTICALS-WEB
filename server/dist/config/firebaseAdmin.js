"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageAdmin = exports.authAdmin = exports.firestore = exports.firebaseAdmin = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let isFirebaseAdminInitialized = false;
try {
    if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
        firebase_admin_1.default.initializeApp({
            credential: firebase_admin_1.default.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            }),
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET || `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
        });
        isFirebaseAdminInitialized = true;
        console.info('🔥 Firebase Admin SDK initialized successfully.');
    }
    else {
        console.info('ℹ️ Firebase credentials not provided in server env. Running with high-performance local store adapter.');
    }
}
catch (error) {
    console.warn('⚠️ Could not initialize Firebase Admin SDK:', error);
}
exports.firebaseAdmin = isFirebaseAdminInitialized ? firebase_admin_1.default : null;
exports.firestore = isFirebaseAdminInitialized ? firebase_admin_1.default.firestore() : null;
exports.authAdmin = isFirebaseAdminInitialized ? firebase_admin_1.default.auth() : null;
exports.storageAdmin = isFirebaseAdminInitialized ? firebase_admin_1.default.storage() : null;
