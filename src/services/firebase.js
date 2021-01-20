import firebase from "firebase/app";

// firebase es un proveedor de servicios tipo serverless
// en este archivo se importa y se configura
// el proyecto con un proyecto de firebase
// utilizaremos athentication y firestore, la base de datos
// de firebase

import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

// api keys

const firebaseConfig = {
  apiKey: "AIzaSyC8mnO1Z5arLZZSUG7u5r4l1Jgc9MGiwUo",
  authDomain: "task-app-e4e3a.firebaseapp.com",
  projectId: "task-app-e4e3a",
  storageBucket: "task-app-e4e3a.appspot.com",
  messagingSenderId: "54066778587",
  appId: "1:54066778587:web:ba02404f957adc350797fe",
  measurementId: "G-BRQ7VH8KNJ",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
