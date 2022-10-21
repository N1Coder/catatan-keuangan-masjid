<script setup>
import BarChart from "../components/chart/BarChart.vue"
import LineChart from "../components/chart/LineChart.vue"
import { ref } from "vue"
import InfoChartPie from "../components/InfoChartPie.vue"
import LoadingInfoAnalytics from "../components/loading/LoadingInfoAnalytics.vue"

const pieChart = ref(null),
  barChart = ref(null),
  lineChart = ref(null)
</script>

<template>
  <section class="grid grid-cols-1 gap-8">
    <h1 class="capitalize text-2xl font-bold text-orange-600">
      grafik keuangan
    </h1>

    <Suspense>
      <template #default>
        <InfoChartPie />
      </template>

      <template #fallback>
        <LoadingInfoAnalytics :background="'bg-slate-800'">
          <div class="w-3/4 h-4 rounded-full bg-slate-300 animate-pulse"></div>
          <div class="w-1/2 h-4 rounded-full bg-slate-300 animate-pulse"></div>

          <div
            class="mx-auto w-[90%] aspect-square rounded-full bg-slate-300 animate-pulse"
          ></div>

          <article
            v-for="index in 2"
            class="flex items-center gap-x-2 bg-white p-4 rounded-lg"
          >
            <div
              class="w-2/5 h-4 rounded-full bg-slate-300 animate-pulse"
            ></div>
            <div
              class="w-4 aspect-square rounded-full bg-slate-300 animate-pulse"
            ></div>

            <div
              class="ml-auto w-1/3 h-4 rounded-full bg-slate-300 animate-pulse"
            ></div>
          </article>
        </LoadingInfoAnalytics>
      </template>
    </Suspense>

    <article
      class="shadow-sharp-lg border-4 border-black grid grid-cols-1 bg-zinc-800 p-4 gap-4"
    >
      <h2 class="capitalize text-xl font-semibold text-white">
        lihat grafik transaksi minggu ini
      </h2>

      <BarChart />
    </article>
    <article
      ref="lineChart"
      class="shadow-sharp-lg border-4 border-black grid grid-cols-1 bg-stone-800 p-4 gap-4"
    >
      <h2 class="capitalize text-xl font-semibold text-white">
        lihat grafik transaksi minggu ini
      </h2>

      <LineChart />
    </article>
  </section>
</template>
