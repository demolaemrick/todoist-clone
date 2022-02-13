import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyAMf1PGVWtuZ8kKUm9f78ZMFrNlkLrLOrw',
  authDomain: 'shopping-cart-ed2a2.firebaseapp.com',
  databaseURL: 'https://shopping-cart-ed2a2.firebaseio.com',
  projectId: 'shopping-cart-ed2a2',
  storageBucket: 'shopping-cart-ed2a2.appspot.com',
  messagingSenderId: '671109725609',
  appId: '1:671109725609:web:69d32006b45af04a0798b8',
  measurementId: 'G-ZQNVLHCRQM',
});

export { firebaseConfig as firebase };
