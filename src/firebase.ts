// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYaZiNq1jhFaA_tpVSXt_cZpJgxDUaLSE",
  authDomain: "pi-libria-e36e7.firebaseapp.com",
  projectId: "pi-libria-e36e7",
  storageBucket: "pi-libria-e36e7.appspot.com",
  messagingSenderId: "1042995182663",
  appId: "1:1042995182663:web:068399867be28032dfc562",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
