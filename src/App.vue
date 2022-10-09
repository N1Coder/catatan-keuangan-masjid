<script setup>
// import { RouterLink, RouterView } from "vue-router"
import { validateUserSession, userSession } from "./utils/useAuth"
import Loading from "./components/Loading.vue"
import HomeView from "./views/HomeView.vue"
import LoginView from "./views/LoginView.vue"
import { dateToday } from "./utils/useTime"

console.log(dateToday)
</script>

<template>
  <div v-if="validateUserSession(userSession)">
    <LoginView />
  </div>

  <div v-else>
    <Suspense>
      <template #default>
        <div>
          <HomeView />
        </div>
      </template>

      <template #fallback>
        <div class="grid place-items-center min-h-screen">
          <Loading />
        </div>
      </template>
    </Suspense>
  </div>
</template>
