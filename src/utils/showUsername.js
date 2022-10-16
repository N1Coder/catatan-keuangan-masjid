import { computed } from "vue"

export const showUsername = computed(() => {
  return (userSession) => {
    const removeAtSymbol = userSession?.user.email.indexOf("@")
    return userSession?.user.email.slice(0, removeAtSymbol)
  }
})
