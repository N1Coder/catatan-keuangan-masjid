<script setup>
import LoadingInfoReport from "../components/loading/LoadingInfoReport.vue"
import InfoCategoryReport from "../components/detail_info/InfoCategoryReport.vue"
</script>

<template>
  <section class="p-dekstop">
    <header>
      <h1
        class="capitalize text-2xl lg:text-3xl font-bold text-orange-600 dark:text-slate-100 mb-6"
      >
        laporan keuangan
      </h1>
    </header>

    <section class="grid grid-cols-1 gap-y-12">
      <Suspense>
        <template #default>
          <InfoCategoryReport />
        </template>

        <template #fallback>
          <LoadingInfoReport :background="'bg-amber-400 dark:bg-slate-900'">
            <div
              class="w-8/12 h-4 lg:h-5 lg:col-span-2 rounded-full animate-pulse bg-slate-300 dark:bg-slate-600"
            ></div>

            <article
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
            </article>
          </LoadingInfoReport>
        </template>
      </Suspense>

      <article
        class="shadow-sharp-lg border-4 border-black grid grid-cols-2 lg:grid-cols-1 w-fit bg-sky-500 dark:bg-slate-900 p-4 gap-4"
      >
        <h2
          class="col-span-3 capitalize text-xl lg:text-2xl font-semibold text-white"
        >
          lihat laporan transaksi
        </h2>

        <RouterLink
          :to="`/report/week`"
          class="button-primary font-semibold text-xs md:text-sm text-center"
        >
          laporan minggu ini
        </RouterLink>

        <!-- DISABLE RECORD FOR MONTH AND YEAR BECAUSE OF UNEXPECTED BEHAVIOR THAT CAUSED MASS DESTRUCTION TO APP -->
        <!-- <RouterLink
          :to="`/report/month`"
          class="button-primary font-semibold text-xs md:text-sm text-center"
        >
          laporan bulan ini
        </RouterLink>

        <RouterLink
          :to="`/report/all`"
          class="button-primary font-semibold text-xs md:text-sm text-center col-span-2 lg:col-span-1"
        >
          laporan keseluruhan
        </RouterLink> -->
      </article>
    </section>
  </section>
</template>
