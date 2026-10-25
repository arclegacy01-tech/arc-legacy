let adminMod;
let getAuth;

async function loadFirebase() {
  if (!adminMod) {
    const imported = await import('firebase-admin');
    adminMod = imported.default ?? imported;
    ({ getAuth } = await import('firebase-admin/auth'));
  }
  return { admin: adminMod, getAuth };
}

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

export async function verifyFirebaseIdToken(idToken) {
  if (!isFirebaseAdminConfigured()) {
    const error = new Error('Google sign-in is not configured on the server');
    error.status = 503;
    throw error;
  }
  const { admin, getAuth: getAuthFn } = await loadFirebase();
  if (!app) {
    app = admin.initializeApp({
      credential: admin.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY),
      }),
    });
  }
  return getAuthFn(app).verifyIdToken(idToken);
}
