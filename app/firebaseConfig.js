// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDU_68IcBBU5hDGXClw8oQpXR5uln0p2Mc",
  authDomain: "peak-power-7868d.firebaseapp.com",
  databaseURL: 'https://peak-power-7868d-default-rtdb.firebaseio.com/',
  projectId: "peak-power-7868d",
  storageBucket: "peak-power-7868d.firebasestorage.app",
  messagingSenderId: "789121051537",
  appId: "1:789121051537:web:ea09e834c8dea9823a0830",
  measurementId: "G-88J7BNS4VX"
};



const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };