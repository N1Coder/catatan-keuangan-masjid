import { supabase } from "../../global/supabase"
import router from "../../router/router"
import { dataNotif } from "../data/dataForNotif"

/**
 * Handles logging a user out of a supabase session
 */
export const handleLogout = async () => {
  console.log("logging out")
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      alert("Error signing out")
      console.error("Error", error.message)
      return
    }

    dataNotif.value.push({
      id: Math.trunc(Math.random() * 100),
      success: true,
      message: "kamu telah logout dari aplikasi",
    })

    router.push({ name: "signin" })
  } catch (err) {
    alert("Unknown error signing out")
    console.error("Error", err)
  }
}
