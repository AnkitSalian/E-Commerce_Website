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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;