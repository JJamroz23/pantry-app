// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCj3TP8tKvvQxfDeQ3XIBWDgsx82dmHWMc",
  authDomain: "pentry-app.firebaseapp.com",
  projectId: "pentry-app",
  storageBucket: "pentry-app.appspot.com",
  messagingSenderId: "108919518385",
  appId: "1:108919518385:web:acf6b5a4a188f6a6d19e90",
  measurementId: "G-63LHWRSDF5",
};

initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);

export const auth = getAuth();
export const database = getFirestore();
