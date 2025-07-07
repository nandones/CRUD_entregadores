import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDP5Id7HZviQpiJp-SH8E-KOs9m29c53ss',
  authDomain: 'prova-2-23933.firebaseapp.com',
  projectId: 'prova-2-23933',
  storageBucket: 'prova-2-23933.firebasestorage.app',
  messagingSenderId: '623171775009',
  appId: '1:623171775009:web:d769f66ef507004626d160',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
