// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ggxraixmbfonvyxltcme.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdneHJhaXhtYmZvbnZ5eGx0Y21lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwODc1NzcsImV4cCI6MjA1MTY2MzU3N30.3tg06YGvtHWVjGChyuA6LU6-A0tzWb3SH92JmZPJhZk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);