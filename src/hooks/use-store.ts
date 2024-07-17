import { useState, useEffect } from 'react';

// Custom hook to use a store and subscribe to its state
export const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown, // Function to subscribe to the store's state
  callback: (state: T) => F // Callback to extract the desired state from the store
) => {
  const result = store(callback) as F; // Get the initial state from the store
  const [data, setData] = useState<F>(); // State to hold the extracted data

  // Effect to update the state when the store's state changes
  useEffect(() => {
    setData(result);
  }, [result]);

  return data; // Return the current state
};
