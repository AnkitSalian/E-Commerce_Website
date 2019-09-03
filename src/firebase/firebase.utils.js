import firebase from 'firebase/app';
import 'firebase/firestore'; //Database
import 'firebase/auth'; //Authentication

const config = {
  apiKey: "AIzaSyD3yKbHPSdtSw5RRBJa4GG1p3Gt1iRXBLI",
  authDomain: "crwn-db-e6847.firebaseapp.com",
  databaseURL: "https://crwn-db-e6847.firebaseio.com",
  projectId: "crwn-db-e6847",
  storageBucket: "",
  messagingSenderId: "859188790327",
  appId: "1:859188790327:web:96e2542041382495"
};

export const createUserProfileDocument = async (userAuth, additionalData)=>{
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();
  console.log(snapshot);

  if(!snapshot.exists){
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }catch(error){
      console.log('Error creating user===>',error);
    }
  }
  return userRef;
  
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;