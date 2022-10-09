import { supabase } from "../../global/supabase"

/**
 * Handles logging a user out of a supabase session
 */
export const handleLogout = async () => {
  console.log("logging out")
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      alert("Error signing out")
      console.error("Error", error)
      return
    }

    alert("You have signed out!")
  } catch (err) {
    alert("Unknown error signing out")
    console.error("Error", err)
  }
}
