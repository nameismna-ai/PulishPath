import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "তোমার-api-key",
  authDomain: "তোমার-project.firebaseapp.com",
  projectId: "তোমার-project-id",
  storageBucket: "তোমার-project.appspot.com",
  messagingSenderId: "তোমার-sender-id",
  appId: "তোমার-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);