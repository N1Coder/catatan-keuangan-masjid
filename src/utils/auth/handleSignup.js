import { supabase } from "../../global/supabase"

/*
 * Handles signup provided a valid credentials object.
 */
export const handleSignup = async (credentials) => {
  try {
    const { email, password } = credentials
    // prompt user if they have not filled populated their credentials
    if (!email || !password) {
      alert("Please provide both your email and password.")
      return
    }
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      alert(error.message)
      console.error(error, error.message)
      return
    }
    alert("Signup successful, confirmation mail should be sent soon!")
  } catch (err) {
    alert("Fatal error signing up")
    console.error("signup error", err)
  }
}
