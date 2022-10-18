import { ref, watch } from "vue"

const dataNotif = ref([])

watch(
  () => dataNotif.value,
  (newDataNotif) => {
    console.log(newDataNotif.value)

    const timer = window.setInterval(() => {
      if (newDataNotif.value.length > 0) {
        newDataNotif.value.shift()
      } else {
        window.clearInterval(timer)
      }
    }, 1000)
  }
)

export { dataNotif }
