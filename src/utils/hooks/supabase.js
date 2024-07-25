import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';


// Access environment variables from expo-config
// const { SUPABASE_URL, SUPABASE_ANON_KEY } = Constants.expoConfig?.extra || {};
// console.log('Supabase URL:', process.env.EXPO_PUBLIC_SUPABASE_URL);
// console.log('Supabase Anon Key:', process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY);

export const supabase = createClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL || "https://nxolmkncetbvbwuodlpa.supabase.co",
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54b2xta25jZXRidmJ3dW9kbHBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEzMzczNzAsImV4cCI6MjAzNjkxMzM3MH0.peRJDosyL2hjjlM__wtzWfTqypdMLvm83Ky9i441h-A",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
