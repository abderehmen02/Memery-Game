import * as firebase from 'firebase/app'
import 'firebase/auth'
import { functions } from 'firebase/app';
import 'firebase/firestore'
import 'firebase/firebase-storage'
// const firebaseConfig = {
//   apiKey: process.env.React_App_apiKey,
//   authDomain: "socialapp-2ba57.firebaseapp.com",
//   projectId: "socialapp-2ba57",
//   storageBucket: "socialapp-2ba57.appspot.com",
//   messagingSenderId: "60201551794",
//   appId: "1:60201551794:web:8814e85e3c4f64c9c386ab"
// };

const firebaseConfig = {
  apiKey: process.env.React_App_apiKey,
  authDomain: process.env.React_App_authDomain,
  projectId: process.env.React_App_projectId,
  storageBucket: process.env.React_App_storageBucket,
  messagingSenderId: process.env.React_App_messagingSenderId,
  appId: process.env.React_App_appId
};


const FirebaseApp = firebase.initializeApp(firebaseConfig)
const db = FirebaseApp.firestore()
const auth = FirebaseApp.auth()
const FirebaseStorage = firebase.storage();
export {db , auth , FirebaseStorage}