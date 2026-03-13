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
    // For local development, you might want to enable the debug token:
    // if (process.env.NODE_ENV === 'development') {
    //   (window as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    // }
    
    const recaptchaKey = "6Lduw4gsAAAAALefrkMe0RvEvZM6x1GqbyhWM4U9";
    
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(recaptchaKey),
      isTokenAutoRefreshEnabled: true
    });

    // Analytics Initialization
    const supported = await isSupported();
    if (supported) {
      getAnalytics(app);
    }
  }
};

export { app, auth, db, ai };
