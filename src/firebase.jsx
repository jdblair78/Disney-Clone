const firebaseConfig = {
  apiKey: "AIzaSyAeYntKpZ0xchtqXowoU5um25pGvbw4TXo",
  authDomain: "disney-pluse-clone-1fdc8.firebaseapp.com",
  projectId: "disney-pluse-clone-1fdc8",
  storageBucket: "disney-pluse-clone-1fdc8.firebasestorage.app",
  messagingSenderId: "318342175825",
  appId: "1:318342175825:web:c6457a36deaa8c02df2c70",
  measurementId: "G-504MJY8613"
};

const fireBaseApp = firebase.initializeApp(firebaseConfig);
const db = fireBaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage}

export default db;
