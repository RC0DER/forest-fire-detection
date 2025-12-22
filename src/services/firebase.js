import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: "FIREBASE_API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  databaseURL: "FIREBASE_DATABASE_URL",
  projectId: "FIREBASE_PROJECT_ID",
  storageBucket: "FIREBASE_PROJECT_ID.appspot.com",
  messagingSenderId: "MESSAGING_SENDER_ID",
  appId: "APP_ID",
  measurementId: "MEASUREMENT_ID"
};

const isFirebaseConfigured = firebaseConfig.apiKey !== "your-api-key" && firebaseConfig.databaseURL !== "your-database-url";

let app = null;
let database = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    database = getDatabase(app);
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
} else {
  console.warn('Firebase not configured. Please update firebase.js with your credentials.');
}

/**
 * Subscribe to readings from Firebase Realtime Database
 * @param {Function} callback - Function called when data changes
 * @returns {Function} Unsubscribe function
 */
export const subscribeToReadings = (callback) => {
  // If Firebase is not configured, return a no-op unsubscribe function
  if (!database) {
    console.warn('Firebase not configured. No data will be received.');
    callback(null);
    return () => {}; // Return empty cleanup function
  }

  try {
    const readingsRef = ref(database, 'readings');
    
    const unsubscribe = onValue(readingsRef, (snapshot) => {
      const data = snapshot.val();
      callback(data);
    }, (error) => {
      console.error('Firebase subscription error:', error);
      callback(null);
    });

    // Return unsubscribe function directly
    return unsubscribe;
  } catch (error) {
    console.error('Error setting up Firebase subscription:', error);
    callback(null);
    return () => {}; // Return empty cleanup function
  }
};

export default database;

