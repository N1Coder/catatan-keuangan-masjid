<script setup>
import { Icon } from "@iconify/vue"
import gsap from "gsap"
import { onMounted, ref } from "vue"

const notif = ref(null)

onMounted(() => {
  gsap.fromTo(
    notif.value,
    {
      ease: "power2.InOut",
      translateY: "-100px",
      duration: 1,
      scale: 0,
    },
    {
      translateY: 0,
      scale: 1,
      delay: 0.25,
    }
  )
})
</script>

<template>
  <div ref="notif" class="toast-notif text-red-500">
    <Icon class="text-3xl" icon="ci:off-close" />
    <p class="capitalize font-medium">ada kesalahan</p>
    <Icon class="close-btn-notif" icon="clarity:window-close-line" />
  </div>
</template>
