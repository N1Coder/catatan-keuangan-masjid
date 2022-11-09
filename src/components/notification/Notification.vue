<script setup>
import { Icon } from "@iconify/vue"
import { computed } from "vue"

const props = defineProps(["status", "message"])

const colorStatus = computed(() => {
  return (status) => {
    if (status === false) {
      return "text-rose-500"
    } else {
      return "text-emerald-500"
    }
  }
})

const iconStatus = computed(() => {
  return (status) => {
    if (status === false) {
      return "ci:off-close"
    } else {
      return "icon-park-solid:success"
    }
  }
})
</script>

<template>
  <div class="toast-notif" :class="colorStatus(status)">
    <Icon class="text-3xl" :icon="iconStatus(status)" />
    <p class="first-letter:capitalize text-sm font-medium flex-grow">
      {{ message }}
    </p>
    <Icon
      @click="$emit('closeNotif')"
      class="close-btn-notif"
      icon="clarity:window-close-line"
    />
  </div>
</template>
