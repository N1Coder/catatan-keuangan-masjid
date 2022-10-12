<script setup>
import { RouterView } from "vue-router"
import { dateToday } from "./utils/useTime"
import Navigation from "./components/Navigation.vue"
import { userSession, validateUserSession } from "./utils/useAuth"

console.log(dateToday)
</script>

<template>
  <RouterView />
  <Navigation v-show="!validateUserSession(userSession)" />
</template>
