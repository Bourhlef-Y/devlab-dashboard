import { supabase } from '@/lib/supabaseClient'; // Import the Supabase client instance
import { removeLoggedInCookie } from '@/utils/authCookie'; // Import the function to remove the logged-in cookie

// Function to sign out the user
export const signOut = async () => {
  await supabase.auth.signOut(); // Sign out the user using Supabase authentication
  removeLoggedInCookie(); // Remove the logged-in cookie
};
