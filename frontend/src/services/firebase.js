// Firebase client initialization
// Env vars required:
// - REACT_APP_FIREBASE_API_KEY
// - REACT_APP_FIREBASE_AUTH_DOMAIN
// - REACT_APP_FIREBASE_PROJECT_ID
// - REACT_APP_FIREBASE_APP_ID (optional but recommended)

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Read config strictly from environment; do not hardcode secrets
const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
const authDomain = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
const projectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const appId = process.env.REACT_APP_FIREBASE_APP_ID;

let app;
let db = null;

if (apiKey && authDomain && projectId && appId) {
  const firebaseConfig = { apiKey, authDomain, projectId, appId };
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  db = getFirestore(app);
} else {
  if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn('Firebase env vars missing; skipping Firebase initialization');
  }
}

export { db };


