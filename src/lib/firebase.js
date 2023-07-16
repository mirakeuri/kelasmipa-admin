// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHyfFhuQhwjTWDaeDN0O2FnEI2PpmG5uA",
  authDomain: "kelasmipa-id.firebaseapp.com",
  projectId: "kelasmipa-id",
  storageBucket: "kelasmipa-id.appspot.com",
  messagingSenderId: "62139172073",
  appId: "1:62139172073:web:fee319c790027f0ab95c78",
  measurementId: "G-HHGQ5H0JQM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)