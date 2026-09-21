
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "ai-interview-agent-7356b.firebaseapp.com",
  projectId: "ai-interview-agent-7356b",
  storageBucket: "ai-interview-agent-7356b.firebasestorage.app",
  messagingSenderId: "564891974087",
  appId: "1:564891974087:web:6372b4ee33c5716d9a01e2"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}