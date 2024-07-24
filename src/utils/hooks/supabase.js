import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';


// Access environment variables from expo-config
// const { SUPABASE_URL, SUPABASE_ANON_KEY } = Constants.expoConfig?.extra || {};
// console.log('Supabase URL:', process.env.EXPO_PUBLIC_SUPABASE_URL);
// console.log('Supabase Anon Key:', process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY);

export const supabase = createClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL || "https://hhyufjhlodjyssehcksx.supabase.co",
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhoeXVmamhsb2RqeXNzZWhja3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEzNjkxODUsImV4cCI6MjAzNjk0NTE4NX0.ia5jnZ99k3XNa6uzLnH7HsFgPKkwHMS52LgVZ5zr_CM",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
