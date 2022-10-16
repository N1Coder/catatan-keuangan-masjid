<script setup>
import { Icon } from "@iconify/vue"

const navLists = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: "ant-design:home-outlined",
  },
  {
    name: "Laporan",
    path: "/report",
    icon: "carbon:report-data",
  },
  {
    name: "Transaksi",
    path: "/add-transactions",
    icon: "fluent:money-calculator-24-regular",
  },
  {
    name: "Grafik",
    path: "/analytics",
    icon: "ant-design:pie-chart-outlined",
  },
]
</script>

<template>
  <nav class="fixed bottom-0 inset-x-0 bg-orange-400">
    <ul class="flex items-center justify-center">
      <li v-for="(nav, i) in navLists" :key="i" class="w-full">
        <RouterLink class="block py-1" :to="nav.path">
          <Icon class="mx-auto text-4xl" :icon="nav.icon" />
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped type="text/tailwindcss">
a {
  @apply transition-colors text-slate-50 hover:bg-slate-50 hover:text-orange-400 active:bg-slate-50 active:text-orange-400;
}

a.link-active,
a.link-exact-active {
  @apply bg-slate-50 text-orange-400 hover:bg-slate-200 hover:text-orange-600;
}
</style>
