import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Import Firebase config from separate file
import { firebaseConfig } from './firebaseConfig';

console.log('Firebase config loaded:', firebaseConfig);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
export default app;
