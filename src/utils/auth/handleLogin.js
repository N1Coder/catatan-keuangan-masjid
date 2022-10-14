import { supabase } from "../../global/supabase"
import router from "../../router/router"
import { userSession } from "./userSession"

/*
 * Handles user login via email + password into a supabase session.
 * If not password is empty, it will send a magic link to the users email address.
 */
export const handleLogin = async (credentials) => {
  const { email, password } = credentials

  try {
    const { error, user } = await supabase.auth.signIn({
      email: email,
      password: password,
    })

    userSession.value = localStorage.getItem("supabase.auth.token")

    if (error) {
      alert("Error logging in: " + error.message)
    }
    // No error throw, but no user detected so send magic link
    if (!error && !user) {
      alert("Check your email for the login link!")
    }

    router.push({ name: "dashboard" })
  } catch (error) {
    console.error("Error thrown:", error.message)
    alert(error.error_description || error)
  }
}
