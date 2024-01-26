// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {  getAuth, GoogleAuthProvider} from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoDgzPFbM5zIX9SbTkRXvWmjN9PSxOis8",
  authDomain: "sapa-trakka.firebaseapp.com",
  projectId: "sapa-trakka",
  storageBucket: "sapa-trakka.appspot.com",
  messagingSenderId: "766741893144",
  appId: "1:766741893144:web:a64181b6d110f1d738f36d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const validation = getAuth(app)
export const db = getFirestore(app)
export const provider= new GoogleAuthProvider()
// firebase login
// firebase init
// firebase deploy

