import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

const firebaseConfig = {
apiKey: "AIzaSyApM1u74_hhEICXfJbsvyn_uGzdkm3wm-0",
  authDomain: "forest-fire-detection-35fc0.firebaseapp.com",
  databaseURL: "https://forest-fire-detection-35fc0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "forest-fire-detection-35fc0",
  storageBucket: "forest-fire-detection-35fc0.firebasestorage.app",
  messagingSenderId: "515450545660",
  appId: "1:515450545660:web:820cafc2f1b1b567a3be79",
  measurementId: "G-KL1LW9NJCR"
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

