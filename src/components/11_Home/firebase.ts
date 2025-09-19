import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_SURsyL95fGiQa1OWTLUjmPNgW4ic1BM",

  authDomain: "medpredit-auth.firebaseapp.com",

  projectId: "medpredit-auth",

  storageBucket: "medpredit-auth.firebasestorage.app",

  messagingSenderId: "158794026736",

  appId: "1:158794026736:web:d2a3e8a8e72755ebe4fc35",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, GoogleAuthProvider, signInWithPopup };
