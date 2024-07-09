import { supabase } from '@/lib/supabaseClient';
import { removeLoggedInCookie } from '@/utils/authCookie';

export const signOut = async () => {
  await supabase.auth.signOut();
  removeLoggedInCookie();
};
