// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const database = getFirestore();

const setUserDoc = async (
  userDocRef,
  { displayName, email },
  additionalInformation
) => {
  try {
    await setDoc(userDocRef, {
      displayName,
      email,
      createdAt: new Date(),
      ...additionalInformation,
    });
  } catch (err) {
    console.log("Error in creating user", err.message);
    throw err;
  }
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  try {
    if (!userAuth) return;
    const userDocRef = doc(database, "users", userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      await setUserDoc(userDocRef, userAuth, additionalInformation);
    } else {
      return userDocRef;
    }
  } catch (error) {
    console.error("Error creating user document from auth");
    throw error;
  }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const authStateChangeListener = (callback) => {
  onAuthStateChanged(auth, callback);
};
