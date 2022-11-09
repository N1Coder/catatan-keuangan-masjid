<script setup>
import { onMounted } from "vue"
import { Icon } from "@iconify/vue"
import { useDark, useToggle } from "@vueuse/core"
import { RouterView } from "vue-router"
import Notifications from "./components/notification/Notifications.vue"
import Notif from "./components/notification/Notification.vue"
import Navigation from "./components/Navigation.vue"
import { userSession, validateUserSession } from "./utils/useAuth"
import { dataNotif } from "./utils/useData"
import { isTabletScreen } from "./utils/useMedia"

const isDark = useDark({
  selector: "body",
})

const toggleDark = useToggle(isDark)

const date = new Date()

onMounted(() => {
  const hours = date.getHours()

  if (hours < 6 || hours > 18) toggleDark()
})

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

  <button
    v-if="isTabletScreen"
    @click="toggleDark()"
    class="fixed flex items-center w-16 right-16 p-2 transition-colors bg-orange-400 dark:bg-slate-800 text-orange-600 dark:text-slate-200 rounded-full"
  >
    <span v-show="isDark === true" class="absolute -left-10">
      <Icon class="text-2xl" icon="bi:moon-stars" />
    </span>
    <span
      class="transition-all w-5 aspect-square rounded-full bg-slate-100"
      :class="!isDark && 'translate-x-7'"
    ></span>
    <span v-show="isDark === false" class="absolute -right-10">
      <Icon class="text-2xl" icon="bi:sun" />
    </span>
  </button>

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
