// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/storage';
import 'firebase/compat/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAor2xXGbeTHgqAy-m1QmIKt5fUfY4uSjk",
    authDomain: "first-project-inter.firebaseapp.com",
    projectId: "first-project-inter",
    storageBucket: "first-project-inter.appspot.com",
    messagingSenderId: "1069838968650",
    appId: "1:1069838968650:web:7f2be8b337ac0e3de5c3b3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const dataref = firebase.database();
export const storage = firebase.storage();
export default firebase;
