import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyB-OLgTE4hosUz7t5GhMcy2_F1BdxNY-7E',
  authDomain: 'facebook-messenger-clone-cbef3.firebaseapp.com',
  projectId: 'facebook-messenger-clone-cbef3',
  storageBucket: 'facebook-messenger-clone-cbef3.appspot.com',
  messagingSenderId: '989160328863',
  appId: '1:989160328863:web:596422ba631cafbdeadcaa',
  measurementId: 'G-CL0GGJXQBQ',
});

const db = firebaseApp.firestore();

export default db;
