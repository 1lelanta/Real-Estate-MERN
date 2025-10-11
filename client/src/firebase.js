// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "lelantaestate.firebaseapp.com",
  projectId: "lelantaestate",
  storageBucket: "lelantaestate.firebasestorage.app",
  messagingSenderId: "481448465351",
  appId: "1:481448465351:web:e6ef5f28928a152c4dbfe2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);