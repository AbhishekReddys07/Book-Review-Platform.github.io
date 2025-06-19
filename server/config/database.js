import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl =" https://gbpvmjhafpivrhvnnklt.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdicHZtamhhZnBpdnJodm5ua2x0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMTI5MjIsImV4cCI6MjA2NTg4ODkyMn0.3OrzdjeYhNZwxnhXf8DL6Rn71u9dy4anXLUtL3Jyhdc";

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase configuration');
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);