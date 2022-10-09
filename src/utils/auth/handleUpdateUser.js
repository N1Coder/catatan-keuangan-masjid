import { supabase } from "../../global/supabase"

export const handleUpdateUser = async (credentials) => {
  try {
    const { error } = await supabase.auth.update(credentials)
    if (error) {
      alert("Error updating user info: " + error.message)
    } else {
      alert("Successfully updated user info!")
      window.location.href = "/"
    }
  } catch (error) {
    alert("Error updating user info: " + error.message)
  }
}
