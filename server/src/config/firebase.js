import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';

let app;

export function isFirebaseAdminConfigured() {
  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY
  );
}

function normalizePrivateKey(key) {
  if (!key) return key;
  if (key.includes('\\n')) return key.replace(/\\n/g, '\n');
  return key;
}

export function getFirebaseAuth() {
  if (!isFirebaseAdminConfigured()) return null;
  if (!app) {
    app = admin.initializeApp({
      credential: admin.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY),
      }),
    });
  }
  return getAuth(app);
}
