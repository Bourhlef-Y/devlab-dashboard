import { type ClassValue, clsx } from "clsx"; // Import ClassValue type and clsx function from clsx library
import { twMerge } from "tailwind-merge"; // Import twMerge function from tailwind-merge library

// Function to merge class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs)); // Use clsx to combine inputs and then merge them with tailwind-merge
}
