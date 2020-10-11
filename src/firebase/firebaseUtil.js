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

export const provider = new firebase.auth.GoogleAuthProvider();

export const firebaseAuth = firebase.auth();

export default firebase;
