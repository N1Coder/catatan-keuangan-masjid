<script setup>
import LoadingInfoDashboard from "./LoadingInfoDashboard.vue"
import LoadingInfoReport from "./LoadingInfoReport.vue"
</script>

<template>
  <LoadingInfoDashboard :count="4" />

  <LoadingInfoReport class="mt-8" :background="'bg-rose-700 dark:bg-slate-900'">
    <div
      class="lg:col-span-2 w-8/12 h-4 lg:h-5 rounded-full animate-pulse bg-slate-300 dark:bg-slate-600"
    ></div>

    <div
      v-for="index in 2"
      :key="index"
      class="bg-white dark:bg-slate-800 p-4 rounded-lg"
    >
      <div
        class="w-1/3 h-4 lg:h-5 rounded-full animate-pulse bg-slate-300 dark:bg-slate-600 mb-4"
      ></div>

      <div class="flex items-center justify-between">
        <div
          class="w-1/2 h-4 lg:h-5 rounded-full animate-pulse bg-slate-300 dark:bg-slate-600"
        ></div>

        <div
          class="mt-2 w-1/6 h-4 lg:h-5 rounded-full animate-pulse bg-slate-300 dark:bg-slate-600"
        ></div>
      </div>

      <div
        class="w-full h-1 rounded-full animate-pulse bg-slate-300 dark:bg-slate-600 my-2 mt-3"
      ></div>

      <div class="flex items-center justify-between">
        <div
          class="w-1/2 h-4 lg:h-5 rounded-full animate-pulse bg-slate-300 dark:bg-slate-600"
        ></div>

        <div
          class="mt-2 w-1/6 h-4 lg:h-5 rounded-full animate-pulse bg-slate-300 dark:bg-slate-600"
        ></div>
      </div>

      <div
        class="w-full h-1 rounded-full animate-pulse bg-slate-300 dark:bg-slate-600 my-2 mt-3"
      ></div>

      <div class="flex items-center justify-between">
        <div
          class="w-1/2 h-4 lg:h-5 rounded-full animate-pulse bg-slate-300 dark:bg-slate-600"
        ></div>

        <div
          class="mt-2 w-1/6 h-4 lg:h-5 rounded-full animate-pulse bg-slate-300 dark:bg-slate-600"
        ></div>
      </div>
    </div>
  </LoadingInfoReport>

  <LoadingInfoDashboard :count="4" />
</template>
