// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWWbsS8WQcumH-C0iAhX-B6_bwCqMLSCY",
  authDomain: "the-cocktail-club-co-657c5.firebaseapp.com",
  projectId: "the-cocktail-club-co-657c5",
  storageBucket: "the-cocktail-club-co-657c5.appspot.com",
  messagingSenderId: "178786147754",
  appId: "1:178786147754:web:c69566e99a715a252c5fd3",
  measurementId: "G-LMF51C87WQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);