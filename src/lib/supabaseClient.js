import { createClient } from '@supabase/supabase-js'; // Import the createClient function from the Supabase library

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Retrieve the Supabase URL from environment variables
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Retrieve the Supabase anonymous key from environment variables

// Check if the Supabase URL and Key are provided
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Key are required.'); // Throw an error if either is missing
}

// Create and export the Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // Enable session persistence across page reloads
    autoRefreshToken: true, // Enable automatic refreshing of authentication tokens
  },
});
  