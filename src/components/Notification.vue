<script setup>
import { Icon } from "@iconify/vue"
import gsap from "gsap"
import { computed, onMounted, ref } from "vue"

const props = defineProps(["status"])

const notif = ref(null)

const defaultMessage = computed(() => {
  if (status === false) {
    return "This is error message"
  } else {
    return "This is success message"
  }
})

const closeNotif = () => {
  console.log("hello")
}

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
    }
  )

  setTimeout(() => {
    gsap.fromTo(
      notif.value,
      {
        translateY: 0,
        scale: 1,
      },
      {
        ease: "power2.InOut",
        translateY: "-100px",
        duration: 1,
        scale: 0,
      }
    )
  }, 3500)
})
</script>

<template>
  <div
    ref="notif"
    class="toast-notif"
    :class="status === false ? 'text-red-500' : 'text-green-500'"
  >
    <Icon
      class="text-3xl"
      :icon="status === false ? 'ci:off-close' : 'icon-park-solid:success'"
    />
    <p class="capitalize font-medium">
      <slot name="message">{{ defaultMessage }}</slot>
    </p>
    <Icon
      @click="closeNotif"
      class="close-btn-notif"
      icon="clarity:window-close-line"
    />
  </div>
</template>
