<script setup>
import { dateToday } from "../utils/useTime"
import { handleLogout } from "../utils/useAuth"
import LoadingInfoDashboard from "../components/loading/LoadingInfoDashboard.vue"
import InfoTransactionToday from "../components/detail_info/InfoTransactionToday.vue"
import InfoTransaction from "../components/detail_info/InfoTransaction.vue"
</script>

<template>
  <section class="p-dekstop">
    <header>
      <h1
        class="capitalize text-xl md:text-2xl text-orange-600 dark:text-slate-100 font-bold"
      >
        overview keuangan masjid Al-Fadhilah
      </h1>
      <p
        class="text-md md:text-lg text-orange-500 dark:text-slate-200 font-semibold"
      >
        Hari ini, {{ dateToday }}
      </p>
    </header>

    <Suspense>
      <template #default>
        <InfoTransaction />
      </template>

      <template #fallback>
        <LoadingInfoDashboard :count="4" />
      </template>
    </Suspense>

    <RouterLink
      class="inline-block mt-6 button-primary"
      :to="{ name: 'transactions' }"
    >
      tambah transaksi
    </RouterLink>

    <RouterLink
      class="inline-block ml-4 button-primary"
      @click="handleLogout"
      :to="{ name: 'signin' }"
    >
      Logout
    </RouterLink>

    <Suspense>
      <template #default>
        <InfoTransactionToday />
      </template>

      <template #fallback>
        <LoadingInfoDashboard :count="4" :colspan="false" />
      </template>
    </Suspense>
  </section>
</template>
