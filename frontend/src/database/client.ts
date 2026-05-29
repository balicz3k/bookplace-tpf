import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

const readEnv = (value?: string) => (value ?? '').trim();

const appConfig = {
  apiKey: readEnv(import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain: readEnv(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: readEnv(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: readEnv(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: readEnv(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  appId: readEnv(import.meta.env.VITE_FIREBASE_APP_ID),
  measurementId: readEnv(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID),
};

if (import.meta.env.DEV) {
  const maskedKey = appConfig.apiKey ? `${appConfig.apiKey.slice(0, 6)}...${appConfig.apiKey.slice(-4)}` : '';
  // eslint-disable-next-line no-console
  console.log('Firebase config (dev):', {
    apiKey: maskedKey,
    authDomain: appConfig.authDomain,
    projectId: appConfig.projectId,
    storageBucket: appConfig.storageBucket,
    appId: appConfig.appId,
  });
}

if (!appConfig.apiKey || !appConfig.authDomain || !appConfig.projectId || !appConfig.appId) {
  // eslint-disable-next-line no-console
  console.warn('Firebase config is incomplete. Check frontend/.env values.');
}

const app = initializeApp(appConfig);

export const databaseClinet = getAuth(app);
void setPersistence(databaseClinet, browserLocalPersistence);
