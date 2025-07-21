// ✅ Remove extra "from" and fix import
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // ✅ usually prefixed with VITE_
  authDomain: "auth-login-5ce2b.firebaseapp.com",
  projectId: "auth-login-5ce2b",
  storageBucket: "auth-login-5ce2b.appspot.com", // ✅ fix domain (".app" → ".appspot.com")
  messagingSenderId: "700320762730",
  appId: "1:700320762730:web:5dbc8209b4541e176cf313",
  measurementId: "G-YD3B8C8Y7F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Firebase Auth and Provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider(); // ✅ fix typo in class name

export { auth, provider };
