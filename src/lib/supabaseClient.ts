import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mockproject.supabase.co';
const supabaseKey =
  typeof window === 'undefined'
    ? process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mockAnonKey'
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mockAnonKey';

export const supabase = createClient(supabaseUrl, supabaseKey);
