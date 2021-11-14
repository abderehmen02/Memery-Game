import * as firebase from 'firebase/app'
import 'firebase/auth'
import { functions } from 'firebase/app';
import 'firebase/firestore'
import 'firebase/firebase-storage'
const firebaseConfig = {
  apiKey: "AIzaSyDN2vtJEvjOZ83dDGBTT6UWz3GN7NviPLQ",
  authDomain: "socialapp-2ba57.firebaseapp.com",
  projectId: "socialapp-2ba57",
  storageBucket: "socialapp-2ba57.appspot.com",
  messagingSenderId: "60201551794",
  appId: "1:60201551794:web:8814e85e3c4f64c9c386ab"
};

const FirebaseApp = firebase.initializeApp(firebaseConfig)
const db = FirebaseApp.firestore()
const auth = FirebaseApp.auth()
const FirebaseStorage = firebase.storage();
export {db , auth , FirebaseStorage}