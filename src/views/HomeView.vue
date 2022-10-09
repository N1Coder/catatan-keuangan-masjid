<script setup>
import { onMounted } from "vue"
import { supabase } from "../global/supabase"
import { handleLogout, userSession } from "../utils/useAuth"

onMounted(() => {
  userSession.value = supabase.auth.session()
})
</script>

<template>
  <h1 class="text-4xl text-teal-500">Hello from home</h1>
  <button
    class="mt-4 px-3 py-1 text-white bg-slate-800 rounded hover:bg-black"
    @click="handleLogout"
  >
    Logout
  </button>
</template>
