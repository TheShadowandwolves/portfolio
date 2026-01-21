// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2vEl8VQJwAMMij_zgXgcP3vdMniXdU6Q",
  authDomain: "portfolio-020997.firebaseapp.com",
  projectId: "portfolio-020997",
  storageBucket: "portfolio-020997.firebasestorage.app",
  messagingSenderId: "16346397233",
  appId: "1:16346397233:web:f1602bab73269a53e17310",
  measurementId: "G-6K2G18CBPY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);