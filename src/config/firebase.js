import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "missing_api_key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "missing_auth_domain",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "missing_project_id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "missing_storage_bucket",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "missing_sender_id",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "missing_app_id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
