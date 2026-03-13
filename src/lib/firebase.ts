import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAI, GoogleAIBackend } from "firebase/ai";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

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

// Initialize the Gemini Developer API backend service
const ai = getAI(app, { backend: new GoogleAIBackend() });

export const initFirebaseServices = async () => {
  if (typeof window !== "undefined") {
    // App Check Initialization
    const recaptchaKey = "6Lduw4gsAAAAALefrkMe0RvEvZM6x1GqbyhWM4U9";
    
    try {
      // Enable App Check debug token for localhost or specific environments if needed
      if (
        window.location.hostname === "localhost" || 
        window.location.hostname === "127.0.0.1" ||
        process.env.NODE_ENV === "development"
      ) {
        // This will log a debug token to the console which can be added 
        // to the Firebase Console -> App Check -> Manage debug tokens
        (window as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
      }

      initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(recaptchaKey),
        isTokenAutoRefreshEnabled: true
      });
      console.log("Firebase App Check initialized.");
    } catch (err) {
      console.error("Firebase App Check initialization failed:", err);
    }

    // Analytics Initialization
    try {
      const supported = await isSupported();
      if (supported) {
        getAnalytics(app);
      }
    } catch (err) {
      console.error("Firebase Analytics initialization failed:", err);
    }
  }
};

export { app, auth, db, ai };
