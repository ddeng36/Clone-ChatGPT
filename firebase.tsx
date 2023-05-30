// Import the functions you need from the SDKs you need
import { getApps, initializeApp,getApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkl3q5gYKWVGSjM6JEt4xw2Wy1mwORh14",
  authDomain: "my-chatgpt-9490f.firebaseapp.com",
  projectId: "my-chatgpt-9490f",
  storageBucket: "my-chatgpt-9490f.appspot.com",
  messagingSenderId: "537578579984",
  appId: "1:537578579984:web:d0ab3cc5df75bd4b640295",
  measurementId: "G-LGG0NW25FM"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}