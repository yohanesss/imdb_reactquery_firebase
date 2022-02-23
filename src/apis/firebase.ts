// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { doc, setDoc } from "firebase/firestore";
import { GoogleAuthProvider, AuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth(app);
export const logOut = async () => {
  await auth.signOut();
};

export const Providers = {
  google: new GoogleAuthProvider(),
};

export const SignInWithSocialMedia = async (provider: AuthProvider) =>
  await auth.signInWithPopup(provider);

export const getFavoriteByDoc = async (uid: string) =>
  await db.collection("favorite").doc(uid);

export const getUserFavorite = async (uid: string) => {
  const favorites = await db.collection("favorite").doc(uid).get();

  return {
    data: await favorites.data(),
    isExists: await favorites.exists,
  };
};

export const createNewDocument = async (
  collectionName: string,
  uid: string,
  payload: any
) => {
  await setDoc(doc(db, collectionName, uid), payload);
};

export const updateDocument = async (
  collectionName: string,
  uid: string,
  payload: any
) => {
  await db.collection(collectionName).doc(uid).update(payload);
};
