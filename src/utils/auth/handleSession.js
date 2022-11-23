import { handleLogout } from "./handleLogout"

const handleSession = (session, supabaseSessionExpire) => {
  const sessionExpires = supabaseSessionExpire
  const timeNow = new Date().getSeconds()

  console.log(`Waiting until expire ${sessionExpires} secs`)

  if (session) {
    if (timeNow - sessionExpires > sessionExpires) {
      return handleLogout()
    }
  } else {
    return
  }
}

export { handleSession }
