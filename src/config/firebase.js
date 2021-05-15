import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBRd1WmtazrHbFnMY-LWJK7t4RkyLiDwYw",
  authDomain: "product-app-a8476.firebaseapp.com",
  projectId: "product-app-a8476",
  storageBucket: "product-app-a8476.appspot.com",
  messagingSenderId: "104260291529",
  appId: "1:104260291529:web:5e66f2f77fe13b008bf618",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { db, auth, provider, storage };
