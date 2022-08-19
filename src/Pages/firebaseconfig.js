import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA9SfDj_aPaALNxd9kkLFulf85A2wpw-tM",
  authDomain: "e-com-auth-16241.firebaseapp.com",
  projectId: "e-com-auth-16241",
  storageBucket: "e-com-auth-16241.appspot.com",
  messagingSenderId: "659266981685",
  appId: "1:659266981685:web:72c2470b9de8fffbf5c67c",
};

const app = initializeApp(firebaseConfig);
export const auth =getAuth(app)