// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABqQ9shLI5gixD0bzqrCE_-hOXcojzefg",
  authDomain: "theinsightsfb.firebaseapp.com",
  projectId: "theinsightsfb",
  storageBucket: "theinsightsfb.appspot.com",
  messagingSenderId: "979779155500",
  appId: "1:979779155500:web:892ab9abba98529f078389"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;