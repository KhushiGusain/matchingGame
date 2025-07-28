// Import the functions you need from the SDKs you need
import Constants from 'expo-constants';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Check if environment variables are available
const getConfigValue = (key) => {
  const value = Constants.expoConfig.extra[key];
  if (!value) {
    console.warn(`⚠️ Missing environment variable: ${key}`);
    console.warn('Please create a .env file with your Firebase configuration');
    return null;
  }
  return value;
};

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getConfigValue('firebaseApiKey'),
  authDomain: getConfigValue('firebaseAuthDomain'),
  projectId: getConfigValue('firebaseProjectId'),
  storageBucket: getConfigValue('firebaseStorageBucket'),
  messagingSenderId: getConfigValue('firebaseMessagingSenderId'),
  appId: getConfigValue('firebaseAppId'),
  measurementId: getConfigValue('firebaseMeasurementId')
};

// Check if all required config values are present
const missingConfig = Object.entries(firebaseConfig).filter(([key, value]) => !value);
if (missingConfig.length > 0) {
  console.error('❌ Missing Firebase configuration values:', missingConfig.map(([key]) => key));
  console.error('Please check your .env file and ensure all Firebase variables are set');
  throw new Error('Firebase configuration incomplete. Check console for details.');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

console.log('✅ Firebase initialized successfully');

export default app; 