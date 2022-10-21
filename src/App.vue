<script setup>
import { RouterView } from "vue-router"
import Notifications from "./components/Notifications.vue"
import Notif from "./components/Notification.vue"
import Navigation from "./components/Navigation.vue"
import { userSession, validateUserSession } from "./utils/useAuth"
import { dataNotif } from "./utils/useData"
import { getWeekDates } from "./utils/time/filterWeek"
import { getYearDates } from "./utils/time/filterYear"
import { getMonthDates } from "./utils/time/filterMonth"
import { onMounted } from "vue"
import { getDataByDate } from "./utils/data/getDataByDate"

const closeNotif = (index) => {
  dataNotif.value.splice(index, 1)
}

// filter data by year
// const [startYear, endYear] = getYearDates()

// onMounted(() => {
//   getDataByDate("pemasukan", "*", "tanggal_pemasukan", startYear, endYear)
//   getDataByDate("pengeluaran", "*", "tanggal_pengeluaran", startYear, endYear)
// })

// filter data by month
// const [startMonth, endMonth] = getMonthDates()

// onMounted(() => {
//   getDataByDate("pemasukan", "*", "tanggal_pemasukan", startMonth, endMonth)
//   getDataByDate("pengeluaran", "*", "tanggal_pengeluaran", startMonth, endMonth)
// })
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

  <RouterView />
  <Navigation v-show="!validateUserSession(userSession)" />
</template>
