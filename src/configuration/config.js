// import { connect } from 'react-</a>firebase'
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyC805A-75gAZFGG2NHyTNfwtTGAvGf_TI0",
    authDomain: "loginauthentication-5bca7.firebaseapp.com",
    databaseURL: "https://loginauthentication-5bca7.firebaseio.com",
    projectId: "loginauthentication-5bca7",
    storageBucket: "loginauthentication-5bca7.appspot.com",
    messagingSenderId: "109674206436",
    appId: "1:109674206436:web:99284feca55390a030c8f1"
};

const fire = firebase.initializeApp(config);
// Initialize Firebase
export default fire;