import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Access environment variables from expo-config
// const { SUPABASE_URL, SUPABASE_ANON_KEY } = Constants.expoConfig?.extra || {};
// console.log('Supabase URL:', process.env.EXPO_PUBLIC_SUPABASE_URL);
// console.log('Supabase Anon Key:', process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY);

export const supabase = createClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL || "https://aixqqkavvvpcilapfqfq.supabase.co",
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpeHFxa2F2dnZwY2lsYXBmcWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEzMzYyMjcsImV4cCI6MjAzNjkxMjIyN30.dOTCUDWiGJ4gl_NF1S1qRk7ELfwYjKG1KRZwZoVtHj0",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);