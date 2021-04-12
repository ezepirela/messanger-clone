import firebase from 'firebase';
const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyDm8j8LPk9Pl94BMGDUku5nPvPXzAJ-vAs",
        authDomain: "facebook-messanger-clone-380e4.firebaseapp.com",
        projectId: "facebook-messanger-clone-380e4",
        storageBucket: "facebook-messanger-clone-380e4.appspot.com",
        messagingSenderId: "230687416060",
        appId: "1:230687416060:web:da3c4c40801ed37e088179"
});
const db = firebaseApp.firestore();
export default db;