const SUPABASE_URL = 'https://zoqmoivwwmtxyrhkdqen.supabase.co';
const SUPABASE_KEY = 'sb_publishable_dBDBzbedRBsRblcAhBbEkw_QlPQAWP0';

window.tideSupabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);