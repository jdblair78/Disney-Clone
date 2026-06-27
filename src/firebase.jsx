import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAeYntKpZ0xchtqXowoU5um25pGvbw4TXo",
  authDomain: "disney-pluse-clone-1fdc8.firebaseapp.com",
  projectId: "disney-pluse-clone-1fdc8",
  storageBucket: "disney-pluse-clone-1fdc8.firebasestorage.app",
  messagingSenderId: "318342175825",
  appId: "1:318342175825:web:c6457a36deaa8c02df2c70",
  measurementId: "G-504MJY8613",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { auth, provider, storage };
export default db;