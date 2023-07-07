// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import "firebase/database";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const config = {
    apiKey: "AIzaSyCQmyCxEkGpX80YTwE1ovC5rQCkQJJgYXs",
    authDomain: "villadesfleurs-d4d5d.firebaseapp.com",
    databaseURL: "https://villadesfleurs-d4d5d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "villadesfleurs-d4d5d",
    storageBucket: "villadesfleurs-d4d5d.appspot.com",
    messagingSenderId: "838822137941",
    appId: "1:838822137941:web:f492e1426ee698dc1e84dc"
};

// Initialize Firebase
const app = initializeApp(config);

export default app;