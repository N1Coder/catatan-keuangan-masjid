<script setup>
import LoadingInfoDashboard from "./LoadingInfoDashboard.vue"
import LoadingInfoReport from "./LoadingInfoReport.vue"
</script>

<template>
  <LoadingInfoDashboard :count="2" />

  <LoadingInfoReport class="mt-8" :background="'bg-rose-700'">
    <div
      class="lg:col-span-2 w-8/12 h-4 lg:h-5 rounded-full animate-pulse bg-slate-300"
    ></div>

    <div v-for="index in 2" :key="index" class="bg-white p-4 rounded-lg">
      <div
        class="w-1/3 h-4 lg:h-5 rounded-full animate-pulse bg-slate-300 mb-4"
      ></div>

      <div class="flex items-center justify-between">
        <div
          class="w-1/2 h-4 lg:h-5 rounded-full animate-pulse bg-slate-300"
        ></div>

        <div
          class="mt-2 w-1/6 h-4 lg:h-5 rounded-full animate-pulse bg-slate-300"
        ></div>
      </div>

      <div
        class="w-full h-1 rounded-full animate-pulse bg-slate-300 my-2 mt-3"
      ></div>

      <div class="flex items-center justify-between">
        <div
          class="w-1/2 h-4 lg:h-5 rounded-full animate-pulse bg-slate-300"
        ></div>

        <div
          class="mt-2 w-1/6 h-4 lg:h-5 rounded-full animate-pulse bg-slate-300"
        ></div>
      </div>

      <div
        class="w-full h-1 rounded-full animate-pulse bg-slate-300 my-2 mt-3"
      ></div>

      <div class="flex items-center justify-between">
        <div
          class="w-1/2 h-4 lg:h-5 rounded-full animate-pulse bg-slate-300"
        ></div>

        <div
          class="mt-2 w-1/6 h-4 lg:h-5 rounded-full animate-pulse bg-slate-300"
        ></div>
      </div>
    </div>
  </LoadingInfoReport>

  <LoadingInfoDashboard :count="4" />
</template>
