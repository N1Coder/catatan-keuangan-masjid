import { supabase } from "../../global/supabase"

/**
 * Handles password reset. Will send an email to the given email address.
 */
export const handlePasswordReset = async () => {
  const email = prompt("Please enter your email:")
  if (!email) {
    window.alert("Email address is required.")
  } else {
    const { error } = await supabase.auth.api.resetPasswordForEmail(email)
    if (error) {
      alert("Error: " + error.message)
    } else {
      alert("Password recovery email has been sent.")
    }
  }
}
