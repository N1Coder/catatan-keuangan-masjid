<script setup>
import { dateToday } from "../utils/useTime"
import { ref } from "vue"
import { handleLogout } from "../utils/useAuth"
import LoadingInfoDashboard from "../components/loading/LoadingInfoDashboard.vue"
import InfoTransactionToday from "../components/detail_info/InfoTransactionToday.vue"
import InfoTransaction from "../components/detail_info/InfoTransaction.vue"

const tambahTransaksi = ref(null)
</script>

<template>
  <section>
    <header>
      <h1 class="capitalize text-xl md:text-2xl text-orange-600 font-bold">
        overview keuangan masjid Al-Fadhilah
      </h1>
      <p class="text-md md:text-lg text-orange-500 font-semibold">
        Hari ini, {{ dateToday }}
      </p>
    </header>

    <Suspense>
      <template #default>
        <InfoTransaction />
      </template>

      <template #fallback>
        <LoadingInfoDashboard :count="3" />
      </template>
    </Suspense>

    <RouterLink
      ref="tambahTransaksi"
      class="inline-block mt-6 button-primary"
      :to="{ name: 'transactions' }"
    >
      tambah transaksi
    </RouterLink>

    <button class="inline-block ml-4 button-primary" @click="handleLogout">
      Logout
    </button>

    <Suspense>
      <template #default>
        <InfoTransactionToday />
      </template>

      <template #fallback>
        <LoadingInfoDashboard :count="4" />
      </template>
    </Suspense>
  </section>
</template>
