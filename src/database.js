// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2qxpK5AeD29y3rUfwiUwhSced4y7t6H0",
  authDomain: "pokedex-inter.firebaseapp.com",
  projectId: "pokedex-inter",
  storageBucket: "pokedex-inter.appspot.com",
  messagingSenderId: "826282036303",
  appId: "1:826282036303:web:efa7caad6838c98b7bee3a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };