import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAI, VertexAIBackend } from "firebase/ai";
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

// Initialize App Check IMMEDIATELY on the client side to prevent race conditions
if (typeof window !== "undefined") {
  const recaptchaKey = "6Lduw4gsAAAAALefrkMe0RvEvZM6x1GqbyhWM4U9";
  
  try {
    // Enable App Check debug token for localhost
    if (
      window.location.hostname === "localhost" || 
      window.location.hostname === "127.0.0.1"
    ) {
      // Use a safer type augmentation or ignore the lint rule for this specific line
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
}

// Initialize the Vertex AI backend service (required for Firebase AI Logic Templates)
const ai = getAI(app, { backend: new VertexAIBackend() });

export const initFirebaseServices = async () => {
  if (typeof window !== "undefined") {
    // Analytics Initialization (Needs to stay in async check due to isSupported())
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
