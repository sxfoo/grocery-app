// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getDatabase, ref, set, push, update, get, runTransaction} from "firebase/database";
import {getAuth} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZSVNiTRpWvjN5vKxojBkK5_j8NXFEDtk",
  authDomain: "grocery-app-5e0ec.firebaseapp.com",
  databaseURL: "https://grocery-app-5e0ec-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "grocery-app-5e0ec",
  storageBucket: "grocery-app-5e0ec.appspot.com",
  messagingSenderId: "399694677329",
  appId: "1:399694677329:web:009a5d6d48faa453c3ff70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore 
const db = getDatabase(app);

//Authentication
const auth = getAuth();

export { app, db, auth, getDatabase, ref, set, push, update, get, runTransaction };


