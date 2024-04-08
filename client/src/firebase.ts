// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "kwakchat.firebaseapp.com",
  projectId: "kwakchat",
  storageBucket: "kwakchat.appspot.com",
  messagingSenderId: "57119049893",
  appId: "1:57119049893:web:07d710c456d77e5eb6654c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
