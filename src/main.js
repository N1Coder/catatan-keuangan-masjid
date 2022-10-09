import { createApp } from "vue"
import App from "./App.vue"
import { supabase } from "./global/supabase"
import { handleLogout, userSession } from "./utils/useAuth"
import router from "./router"
import "./main.css"

const app = createApp(App)

app.use(router)

app.mount("#app")

supabase.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_IN") {
    console.log(event, session)
    userSession.value = session
  } else if (event === "TOKEN_REFRESHED") {
    console.log(event, session)
    handleLogout()
    userSession.value = null

    if (event === "SIGNED_OUT") {
      console.log(event, session)
      return null
    }
  }
})
