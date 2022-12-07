// import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, database } from "./";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

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
