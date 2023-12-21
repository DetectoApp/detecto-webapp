import { createClient } from '@supabase/supabase-js';
import { Database } from '../../database.types';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY ?? ''; //TODO

export default createClient<Database>(supabaseUrl, supabaseAnonKey);
