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

 export const createUserProfileDocument = async(userAuth, additionalData)=>{
   if (!userAuth)return;

   const userRef = firestore.doc(`users/${userAuth.uid}`)
   const snapShot = await userRef.get()

   if (!snapShot.exists){
     const {displayName, email} =userAuth;
     const createdAt = new Date();
     try {
       await userRef.set({
         displayName,
         email,
         createdAt,
         ...additionalData
       })

     }catch (error) {
       console.log('error creating user', error.message);
     }
   }
   return userRef;
 }


 export const addCollectionAndDocuments =async (collectionKey, objectsToAdd) => {
   const collectionRef = firestore.collection(collectionKey);
   console.log(collectionRef)

   const batch = firestore.batch();
   objectsToAdd.forEach(obj => {
     const newDocRef= collectionRef.doc();
     batch.set(newDocRef, obj)
   })

   return await batch.commit()

 };

 export const convertCollectionsSnapshotToMap = (collections) => {
   const transformedCollection = collections.docs.map(doc => {
     const {title, items} = doc.data();

     return {
       routeName: encodeURI (title.toLowerCase()),
       id: doc.id,
       title,
       items
     }
   })
   return transformedCollection.reduce((accumulator,collection) =>{
     accumulator[collection.title.toLowerCase()] = collection;
     return accumulator;
   }, {})
 }

 export const getCurrentUser = () => {
   return new Promise((resolve, reject) => {
     const unsubscribe = auth.onAuthStateChanged((userAuth) => {
       unsubscribe();
       resolve(userAuth);
     }, reject);
   });
 };



  firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
