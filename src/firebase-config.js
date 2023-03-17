// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVN56uxRmhLMHwdxE8Ys11CTpntZUqn-0",
  authDomain: "mychatapp-ede6f.firebaseapp.com",
  projectId: "mychatapp-ede6f",
  storageBucket: "mychatapp-ede6f.appspot.com",
  messagingSenderId: "400981156272",
  appId: "1:400981156272:web:7364dc290ad23ae746f675"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);