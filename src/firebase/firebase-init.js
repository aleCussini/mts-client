// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import { getDatabase } from "firebase/database";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsLpUt1qb9jFiQXk-cqVqgrfIOd3MAgD0",
  authDomain: "mediateamsoftware.firebaseapp.com",
  databaseURL: "https://mediateamsoftware-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mediateamsoftware",
  storageBucket: "mediateamsoftware.appspot.com",
  messagingSenderId: "176972181067",
  appId: "1:176972181067:web:143a783fee4745d19e27ce"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = getDatabase(firebaseApp);
const auth = firebase.auth();

export default { auth, db };