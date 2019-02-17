import firebase from 'firebase/app';
import 'firebase/storage'

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyB2tZMu417SiJpWKxABDnU9KVW23ppbw5E",
    authDomain: "polaris-task.firebaseapp.com",
    databaseURL: "https://polaris-task.firebaseio.com",
    projectId: "polaris-task",
    storageBucket: "polaris-task.appspot.com",
    messagingSenderId: "997603741828"
  };
  firebase.initializeApp(config);

  const storage = firebase.storage();

  export {storage , firebase as default }