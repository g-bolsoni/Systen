import firebase from 'firebase'
import 'firebase/auth'

let firebaseConfig = {
    apiKey: "AIzaSyCte7h3pbJavXg-mLQBA0sxTkD6rwvPoI0",
    authDomain: "system-d5719.firebaseapp.com",
    projectId: "system-d5719",
    storageBucket: "system-d5719.appspot.com",
    messagingSenderId: "1008771882796",
    appId: "1:1008771882796:web:cab3bcddf37e84d2c21689",
    measurementId: "G-J6TL97DGBE"
  };
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
  
export default firebase;