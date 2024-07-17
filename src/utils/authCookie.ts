import { Console } from "console";

// Set a logged-in cookie with a 1-hour expiration
export const setLoggedInCookie = () => {
  document.cookie = `isLoggedIn=true; path=/; max-age=3600`; // Cookie valid for 1 hour
  console.log('Cookie has been set');
};

// Check if the logged-in cookie exists
export const isLoggedIn = () => {
  return document.cookie.split('; ').some(cookie => cookie.startsWith('isLoggedIn=true'));
};

// Remove the logged-in cookie by setting its expiration to a past date
export const removeLoggedInCookie = () => {
  document.cookie = 'isLoggedIn=; Max-Age=-1; path=/'; // Remove the cookie by setting an expired date
  console.log('Cookie removed');
};
