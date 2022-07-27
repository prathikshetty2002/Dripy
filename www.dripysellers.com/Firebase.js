// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmFe4_zOoo34MPl9T9HDG91nl8oEA1jo8",
  authDomain: "dripy-e1420.firebaseapp.com",
  projectId: "dripy-e1420",
  storageBucket: "dripy-e1420.appspot.com",
  messagingSenderId: "270889450216",
  appId: "1:270889450216:web:9b9d1c544072f35df7275d",
  measurementId: "G-1NLPYJVY64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app)
const storage = getStorage(app)


export {auth, db ,storage}
export default app