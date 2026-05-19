const admin = require('firebase-admin');

// We need a service account key to initialize the admin SDK.
// Since we don't have it checked into source control (security risk),
// we will parse it from an environment variable if it exists.

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase Admin SDK initialized successfully.');
  } else {
    console.warn('FIREBASE_SERVICE_ACCOUNT env variable is missing. Firebase Admin SDK NOT initialized.');
  }
} catch (error) {
  console.error('Failed to initialize Firebase Admin SDK:', error.message);
}

module.exports = admin;
