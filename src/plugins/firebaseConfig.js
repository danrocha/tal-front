import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseui from 'firebaseui';

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: 'the-architecture-list.firebaseapp.com',
  databaseURL: 'https://the-architecture-list.firebaseio.com',
  projectId: 'the-architecture-list',
  storageBucket: 'the-architecture-list.appspot.com',
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
};

export const FBApp = firebase.initializeApp(config);
export const FBUIApp = new firebaseui.auth.AuthUI(firebase.auth(FBApp));
