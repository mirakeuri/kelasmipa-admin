// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDD2qSIanrC2yp7Xm1dnTFJUSWifRNIUvA",
  authDomain: "kelasmipa-admin.firebaseapp.com",
  projectId: "kelasmipa-admin",
  storageBucket: "kelasmipa-admin.appspot.com",
  messagingSenderId: "900473039493",
  appId: "1:900473039493:web:bdf89f267ec33b105097ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)