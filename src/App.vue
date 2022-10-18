<script setup>
import { RouterView } from "vue-router"
import Notifications from "./components/Notifications.vue"
import Notif from "./components/Notification.vue"
import Navigation from "./components/Navigation.vue"
import { userSession, validateUserSession } from "./utils/useAuth"
import { dataNotif } from "./utils/useData"
import { getWeekDates } from "./utils/time/filterWeek"

const closeNotif = (index) => {
  dataNotif.value.splice(index, 1)
}

const [startWeek, endWeek] = getWeekDates()
console.log(startWeek, endWeek)
</script>

<template>
  <!-- WIP for later -->
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

  <RouterView />
  <Navigation v-show="!validateUserSession(userSession)" />
</template>
