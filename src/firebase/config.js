// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAix7PwfQP8v67mMgpJhK2ozo9ztCMgsUk",
    authDomain: "ecommerce-52190.firebaseapp.com",
    projectId: "ecommerce-52190",
    storageBucket: "ecommerce-52190.appspot.com",
    messagingSenderId: "316034644642",
    appId: "1:316034644642:web:a12623b9dae807cdf075fb"
};
  
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()