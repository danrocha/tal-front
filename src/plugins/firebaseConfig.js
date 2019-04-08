import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseui from 'firebaseui';

const config = {
  apiKey: 'AIzaSyAP4lBHJXha93cdzvXdGYl0yJJZoDcdGTc',
  authDomain: 'the-architecture-list.firebaseapp.com',
  databaseURL: 'https://the-architecture-list.firebaseio.com',
  projectId: 'the-architecture-list',
  storageBucket: 'the-architecture-list.appspot.com',
  messagingSenderId: '477962938874',
};

export const FBApp = firebase.initializeApp(config);
export const FBUIApp = new firebaseui.auth.AuthUI(firebase.auth(FBApp));
