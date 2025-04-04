// utils/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCAY60WOc4rXg3JsHV9emXJXRRi3w9Af6g",
  authDomain: "fi14134579.firebaseapp.com",
  projectId: "fi14134579",
  storageBucket: "fi14134579.firebasestorage.app",
  messagingSenderId: "699332577294",
  appId: "1:699332577294:web:422770c914961c2e5c145f",
  measurementId: "G-7TBHC1536B"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// تنظیم Persistence به localStorage
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Persistence set to local');
  })
  .catch((error) => {
    console.error('Error setting persistence:', error);
  });

export { auth };
export const db = getFirestore(app);