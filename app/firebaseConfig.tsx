import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDU_68IcBBU5hDGXClw8oQpXR5uln0p2Mc",
  authDomain: "peak-power-7868d.firebaseapp.com",
  databaseURL: "https://peak-power-7868d-default-rtdb.firebaseio.com/",
  projectId: "peak-power-7868d",
  storageBucket: "peak-power-7868d.firebasestorage.app",
  messagingSenderId: "789121051537",
  appId: "1:789121051537:web:ea09e834c8dea9823a0830",
  measurementId: "G-88J7BNS4VX"
};

// Initialize Firebase only if it's not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getDatabase(app);
const auth = getAuth(app);

export { app, db, auth };
