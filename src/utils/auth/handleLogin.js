import { supabase } from "../../global/supabase"
import router from "../../router/router"
import { dataNotif } from "../data/dataForNotif"
import { showUsername } from "../showUsername"
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

    userSession.value = JSON.parse(localStorage.getItem("supabase.auth.token"))

    if (error) throw error
    // No error throw, but no user detected so send magic link
    if (!error && !user) {
      dataNotif.value.push({
        id: Math.trunc(Math.random() * 100),
        success: true,
        message: `Silahkan cek email anda`,
      })
    }

    console.log(userSession.value)

    dataNotif.value.push({
      id: Math.trunc(Math.random() * 100),
      success: true,
      message: `Selamat datang ${showUsername(
        userSession.value.currentSession
      )}`,
    })
    router.push({ name: "dashboard" })
  } catch (error) {
    console.error("Error thrown:", error.message)
    dataNotif.value.push({
      id: Math.trunc(Math.random() * 100),
      success: false,
      message: `Error: ${error.message}`,
    })
  }
}
