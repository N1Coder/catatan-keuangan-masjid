import { supabase } from "../../global/supabase"

/**
 * Handles signup via Third Party Login.
 * https://supabase.com/docs/guides/auth#third-party-logins
 */
export const handleOAuthLogin = async (provider) => {
  const { error } = await supabase.auth.signIn({ provider })
  if (error) console.error("Error: ", error.message)
}
