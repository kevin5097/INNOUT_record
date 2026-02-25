import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEmr6Xx-UiHsX20mcCh6ZZG6MY0UHyFhc",
  authDomain: "innout-record.firebaseapp.com",
  projectId: "innout-record",
  storageBucket: "innout-record.firebasestorage.app",
  messagingSenderId: "333215415447",
  appId: "1:333215415447:web:622bd821752575def6bdd2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

