// Firebase client initialization
// Env vars required:
// - REACT_APP_FIREBASE_API_KEY
// - REACT_APP_FIREBASE_AUTH_DOMAIN
// - REACT_APP_FIREBASE_PROJECT_ID
// - REACT_APP_FIREBASE_APP_ID (optional but recommended)

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Prefer env vars; fallback to provided config if envs are missing
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'AIzaSyDgJ30vAptadLVtwwtQjtNZCsBG5djs_kw',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'rohan-portfolio-website.firebaseapp.com',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'rohan-portfolio-website',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || '1:933158385028:web:d19827eafc52a8583c59d1',
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const db = getFirestore(app);


