<script setup>
import { Icon } from "@iconify/vue"

import ReportTimeDetail from "../components/detail_info/InfoReportTimeDetail.vue"
import LoadingInfoReportDetail from "../components/loading/LoadingInfoReportDetail.vue"
</script>

<template>
  <section class="p-dekstop">
    <Suspense>
      <template #default>
        <ReportTimeDetail />
      </template>

      <template #fallback>
        <LoadingInfoReportDetail />
      </template>
    </Suspense>

    <RouterLink
      class="flex items-center w-fit mt-8 button-primary"
      :to="{ name: 'report' }"
    >
      <Icon icon="ic:baseline-arrow-back-ios-new" />
      <p>kembali</p>
    </RouterLink>
  </section>
</template>
