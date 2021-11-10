// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBwAoET0uhlrzoRWX1G8hhsjUZhjZ9Gghs",
  authDomain: "modular-visitor-331708.firebaseapp.com",
  projectId: "modular-visitor-331708",
  storageBucket: "modular-visitor-331708.appspot.com",
  messagingSenderId: "846049711853",
  appId: "1:846049711853:web:30030d0a82a02f0d105ee4"
};

// Initialize Firebase

// // Initialize Firebase with a "default" Firebase project
// const defaultProject = initializeApp(firebaseConfig);

// console.log(defaultProject.name);  // "[DEFAULT]"

// // Option 1: Access Firebase services via the defaultProject variable
// export let defaultStorage = getStorage(defaultProject);
// export let defaultFirestore = getFirestore(defaultProject);

