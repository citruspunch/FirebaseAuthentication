import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import dotenv from 'dotenv'; 
//dotenv.config();

const firebaseConfig = {
  apiKey: "AIzaSyCIqcZWYgD4AYfq1uXq1310Ko5nYsJhwDY",
  authDomain: "lab-9---firebase-auth-react.firebaseapp.com",
  projectId: "lab-9---firebase-auth-react",
  storageBucket: "lab-9---firebase-auth-react.firebasestorage.app",
  messagingSenderId: "291568402867",
  appId: "1:291568402867:web:2d3787bf8074a6c6438bc6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
console.log("Firebase initialized:", auth);