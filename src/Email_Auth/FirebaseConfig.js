import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_ethjK9Du20xDqMrblV9gU5e0XIR570Y",
  authDomain: "emailassesment-7e1ad.firebaseapp.com",
  projectId: "emailassesment-7e1ad",
  storageBucket: "emailassesment-7e1ad.appspot.com",
  messagingSenderId: "291509323369",
  appId: "1:291509323369:web:b49ba7e90da6b404aa44f8",
  measurementId: "G-H7QTSZLP8W",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

