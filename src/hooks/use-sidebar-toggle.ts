import { create } from 'zustand'; // Importing the create function from zustand to create a state store
import { persist, createJSONStorage } from 'zustand/middleware'; // Importing middleware functions for persisting the state

// Defining the interface for the sidebar toggle store
interface useSidebarToggleStore {
  isOpen: boolean; // State indicating if the sidebar is open or closed
  setIsOpen: () => void; // Function to toggle the sidebar state
}

// Creating the sidebar toggle store using zustand
export const useSidebarToggle = create(
  persist<useSidebarToggleStore>(
    (set, get) => ({
      isOpen: true, // Initial state of the sidebar is open
      setIsOpen: () => {
        set({ isOpen: !get().isOpen }); // Toggle the state of the sidebar
      }
    }),
    {
      name: 'sidebarOpen', // Name of the storage item
      storage: createJSONStorage(() => localStorage) // Using localStorage to persist the state
    }
  )
);
