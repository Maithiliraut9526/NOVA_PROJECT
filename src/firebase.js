import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKaaTsYdO9FCypUrXIskkTeF7ZN7x5tsY",
  authDomain: "surgialai.firebaseapp.com",
  projectId: "surgialai",
  storageBucket: "surgialai.firebasestorage.app",
  messagingSenderId: "656493156958",
  appId: "1:656493156958:web:f8b5be3a2b5193f83cf2cf",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);