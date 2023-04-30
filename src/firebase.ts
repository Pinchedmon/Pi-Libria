// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeCJaE17gELQwXF_SBhuBP4iFBR0Tvtww",
  authDomain: "pi-libria.firebaseapp.com",
  projectId: "pi-libria",
  storageBucket: "pi-libria.appspot.com",
  messagingSenderId: "791705701733",
  appId: "1:791705701733:web:7c3ffa4999972ad286658c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
