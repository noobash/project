import firebase from 'firebase';
//import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAC9JsnUZQ9yMHN_pULntX4fG5s_dy1LsE",
  authDomain: "final-project-66497.firebaseapp.com",
  projectId: "final-project-66497",
  storageBucket: "final-project-66497.appspot.com",
  messagingSenderId: "999942751389",
  appId: "1:999942751389:web:629567735cfe1cf0d8c074"
};

const fire = firebase.initializeApp(firebaseConfig);
export const db = fire.firestore();
export default fire;
