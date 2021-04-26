import firebase from 'firebase'
import '@firebase/auth';
import '@firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDMmt8p7tB2SdaPdr4JNy_2_Gki5hgneK0",
    authDomain: "mya-exam-rich.firebaseapp.com",
    databaseURL: "https://mya-exam-rich-default-rtdb.firebaseio.com",
    projectId: "mya-exam-rich",
    storageBucket: "mya-exam-rich.appspot.com",
    messagingSenderId: "921104913855",
    appId: "1:921104913855:web:8ff2379fbcee5c9381bd0a"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export { firebase };