import { createClient } from "@supabase/supabase-js"

const supabaseURL = import.meta.env.VITE_APP_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_APP_SUPABASE_KEY

export const supabase = createClient(supabaseURL, supabaseKey)
