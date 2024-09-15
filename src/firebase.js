// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkAcYcuqqYEhx-5Ynx9BkzBRbHgOmO0vY",
  authDomain: "fir-c5597.firebaseapp.com",
  projectId: "fir-c5597",
  storageBucket: "fir-c5597.appspot.com",
  messagingSenderId: "606833777685",
  appId: "1:606833777685:web:99090972d2c9807305821c",
  measurementId: "G-6ZG42Q36YN",
  databaseURL : "https://fir-c5597-default-rtdb.firebaseio.com"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
