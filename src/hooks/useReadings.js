import { useState, useEffect } from 'react';
import { subscribeToReadings } from '../services/firebase';

/**
 * Custom hook to subscribe to Firebase readings
 * @returns {Object|null} Current readings data or null if not available
 */
export const useReadings = () => {
  const [readings, setReadings] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToReadings((data) => {
      setReadings(data);
    });

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return readings;
};

