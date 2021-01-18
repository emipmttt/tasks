import firebase from "firebase/app";

// firebase is a serverless provider
// we use it to authentication and database
// in this file, we can found the config
// and connection to the sdk

import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

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
