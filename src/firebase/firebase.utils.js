import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


 const config = {
   apiKey: "AIzaSyCrnu17mYc_Jp4A_BEsN6FK1qbqCcWye1c",
   authDomain: "clothing-db-98ba8.firebaseapp.com",
   databaseURL: "https://clothing-db-98ba8.firebaseio.com",
   projectId: "clothing-db-98ba8",
   storageBucket: "clothing-db-98ba8.appspot.com",
   messagingSenderId: "91221948546",
   appId: "1:91221948546:web:c00b16c53b8c99a4c4dc9b",
   measurementId: "G-DD8319Z2YV",
 };

  firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
