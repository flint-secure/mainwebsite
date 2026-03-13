import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyc2D5WTW7cZvY7f7qVRBARVtlk1d3JAw",
  authDomain: "mainwebsite-flint.firebaseapp.com",
  projectId: "mainwebsite-flint",
  storageBucket: "mainwebsite-flint.firebasestorage.app",
  messagingSenderId: "903310568503",
  appId: "1:903310568503:web:8a40f5b4d27ef6d325a3b2",
  measurementId: "G-YM4L08WVVW"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const initAnalytics = async () => {
  if (typeof window !== "undefined") {
    const supported = await isSupported();
    if (supported) {
      return getAnalytics(app);
    }
  }
  return null;
};

export { app, auth, db };
