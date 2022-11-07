<script setup>
import { RouterView } from "vue-router"
import Notifications from "./components/notification/Notifications.vue"
import Notif from "./components/notification/Notification.vue"
import Navigation from "./components/Navigation.vue"
import { userSession, validateUserSession } from "./utils/useAuth"
import { dataNotif } from "./utils/useData"
import { getLastWeekDates } from "./utils/useTime"

const lw = getLastWeekDates()
console.log(lw)

const closeNotif = (index) => {
  dataNotif.value.splice(index, 1)
}
</script>

<template>
  <Notifications>
    <transition-group name="notif">
      <Notif
        v-for="(msgNotif, i) in dataNotif"
        @close-notif="closeNotif(i)"
        :key="msgNotif?.id"
        :status="msgNotif?.success"
        :message="msgNotif?.message"
      />
    </transition-group>
  </Notifications>

  <!-- KEEPALIVE STILL WIP, STILL NOT STABLE RIGHT NOW -->
  <!-- key for tracking dynamic route params -->
  <!-- <RouterView v-slot="{ Component }">
    <KeepAlive>
      <component :is="Component" :key="route.fullPath" />
    </KeepAlive>
  </RouterView> -->

  <!-- USE NORMAL ROUTERVIEW FOR NOW -->
  <RouterView />

  <Navigation v-show="!validateUserSession(userSession)" />
</template>
