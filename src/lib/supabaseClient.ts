export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true, // Utile pour l'auth avec providers
  },
  global: {
    headers: {
      'x-application-name': 'DevLab',
    },
  },
}); 