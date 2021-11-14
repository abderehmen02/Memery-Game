import * as firebase from 'firebase/app';
import 'firebase/firestore'
const firebaseConfig = {
name: 'would-you-rather' ,
  apiKey: "AIzaSyAFpQ_9vTjavrUsYRybqdqLFDcfmpupKIg",
  authDomain: "would-you-rather-55cc2.firebaseapp.com",
  projectId: "would-you-rather-55cc2",
  storageBucket: "would-you-rather-55cc2.appspot.com",
  messagingSenderId: "873766101446",
  appId: "1:873766101446:web:c29609ef5e71e56ed092c7"
};
let firebaseapp ;
 if (!firebase.apps.length) {
    firebaseapp = firebase.initializeApp(firebaseConfig);
}
else{ firebaseapp = firebase.app() }
export const db = firebaseapp.firestore()