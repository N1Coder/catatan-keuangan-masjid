import { ref, watchEffect } from "vue"

const dataNotif = ref([])

watchEffect((onInvalidate) => {
  if (dataNotif.value.length > 0) {
    const deleteNotif = setInterval(() => {
      dataNotif.value.shift()
    }, 2000)

    onInvalidate(() => {
      clearInterval(deleteNotif)
    })
  }
})

export { dataNotif }
