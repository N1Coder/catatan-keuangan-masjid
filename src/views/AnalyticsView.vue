<script setup>
import InfoChartBar from "../components/detail_info/InfoChartBar.vue"
import InfoChartLine from "../components/detail_info/InfoChartLine.vue"
import InfoChartPie from "../components/detail_info/InfoChartPie.vue"

import LoadingInfoAnalytics from "../components/loading/LoadingInfoAnalytics.vue"
</script>

<template>
  <section class="grid grid-cols-1 lg:grid-cols-2 p-dekstop pr-[6vw] gap-8">
    <h1
      class="lg:col-span-2 capitalize text-2xl lg:text-3xl font-bold text-orange-600 dark:text-slate-100"
    >
      grafik keuangan
    </h1>

    <Suspense>
      <template #default>
        <InfoChartPie />
      </template>

      <template #fallback>
        <LoadingInfoAnalytics
          class="lg:row-span-2"
          :background="'bg-slate-800'"
        >
          <div
            class="w-3/4 h-4 lg:h-5 rounded-full bg-slate-300 dark:bg-slate-600 animate-pulse"
          ></div>
          <div
            class="w-1/2 h-4 lg:h-5 rounded-full bg-slate-300 dark:bg-slate-600 animate-pulse"
          ></div>

          <div
            class="mx-auto w-[90%] aspect-square rounded-full bg-slate-300 dark:bg-slate-600 animate-pulse"
          ></div>

          <article
            v-for="index in 2"
            class="flex items-center gap-x-2 bg-white p-4 rounded-lg"
          >
            <div
              class="w-2/5 h-4 lg:h-5 rounded-full bg-slate-300 dark:bg-slate-600 animate-pulse"
            ></div>
            <div
              class="w-4 aspect-square rounded-full bg-slate-300 dark:bg-slate-600 animate-pulse"
            ></div>

            <div
              class="ml-auto w-1/3 h-4 lg:h-5 rounded-full bg-slate-300 dark:bg-slate-600 animate-pulse"
            ></div>
          </article>
        </LoadingInfoAnalytics>
      </template>
    </Suspense>

    <Suspense>
      <template #default>
        <InfoChartBar />
      </template>

      <template #fallback>
        <LoadingInfoAnalytics :background="'bg-slate-800'">
          <div
            class="w-3/4 h-4 lg:h-5 rounded-full bg-slate-300 dark:bg-slate-600 animate-pulse"
          ></div>
          <div
            class="w-1/2 h-4 lg:h-5 rounded-full bg-slate-300 dark:bg-slate-600 animate-pulse"
          ></div>

          <div
            class="mx-auto w-full aspect-video rounded-lg bg-slate-300 dark:bg-slate-600 animate-pulse"
          ></div>
        </LoadingInfoAnalytics>
      </template>
    </Suspense>

    <Suspense>
      <template #default>
        <InfoChartLine />
      </template>

      <template #fallback>
        <LoadingInfoAnalytics :background="'bg-slate-800'">
          <div
            class="w-3/4 h-4 lg:h-5 rounded-full bg-slate-300 dark:bg-slate-600 animate-pulse"
          ></div>
          <div
            class="w-1/2 h-4 lg:h-5 rounded-full bg-slate-300 dark:bg-slate-600 animate-pulse"
          ></div>

          <div
            class="mx-auto w-full aspect-video rounded-lg bg-slate-300 dark:bg-slate-600 animate-pulse"
          ></div>
        </LoadingInfoAnalytics>
      </template>
    </Suspense>
  </section>
</template>
