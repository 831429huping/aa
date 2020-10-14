import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA61bpdXP-izwnkquC0EDmyjXEy_dH_zpo",
  authDomain: "applied-abbey-220908.firebaseapp.com",
  databaseURL: "https://applied-abbey-220908.firebaseio.com",
  projectId: "applied-abbey-220908",
  storageBucket: "applied-abbey-220908.appspot.com",
  messagingSenderId: "603130989889",
  appId: "1:603130989889:web:a46251fff9fb43be2ba5c0",
  measurementId: "G-GV92C9N12H",
};


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const createUserProfileDoc = async (userAuth, addtionalData) => {
  //When user signed out, the userAuth would be null. Then just exit this function
  if (!userAuth)
    return;
  
  //userAuth is not null means that user has signed in successfully.
  const { displayName, email } = userAuth;
  const createdAt = new Date();  // Time that user was created 
  const userRef = db.doc(`users/${userAuth.uid}`);
  try {
    const userSnapShot = await userRef.get();

    if (userSnapShot.exists) {
      console.log("user already exists in database");
    } else {
    //add user to the firestore db
    
     await userRef.set({
      displayName,
      email,
      createdAt,
      ...addtionalData,
     })
      console.log("User wad added in dabatase successfully")
    }
    
  } catch (error) {
    console.log("Error adding user to databse:", error);
} finally {
  return userRef;
  }
  
};

export const provider = new firebase.auth.GoogleAuthProvider();
export const firebaseAuth = firebase.auth();

export default firebase;
