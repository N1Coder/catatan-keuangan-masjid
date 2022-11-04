<script setup>
import { reactive } from "vue"
import { handleLogin } from "../utils/useAuth"

const dataLogin = reactive({
  email: null,
  password: null,
})
</script>

<template>
  <section>
    <form
      class="bg-white flex flex-col rounded shadow-sharp-lg border-[3px] border-black mt-24 p-8 px-6 gap-6 text-slate-800 md:max-w-md md:mx-auto"
      @submit.prevent="handleLogin(dataLogin)"
    >
      <h2 class="text-2xl font-bold">Sign in CaKeMas</h2>
      <label>
        <p class="capitalize text-xl tracking-wide font-semibold">email</p>

        <input
          class="bg-slate-200 rounded w-full py-2 px-3 focus:outline-4 focus:outline-orange-400 focus:bg-slate-100"
          placeholder="Masukkan email anda"
          required
          v-model="dataLogin.email"
          type="email"
        />
      </label>

      <label>
        <p class="capitalize text-xl tracking-wide font-semibold">kata sandi</p>

        <input
          class="bg-slate-200 rounded w-full py-2 px-3 focus:outline-4 focus:outline-orange-400 focus:bg-slate-100"
          placeholder="Masukkan kata sandi anda"
          required
          v-model="dataLogin.password"
          type="password"
        />
      </label>

      <label>
        <input
          class="bg-slate-800 px-6 py-2 text-white font-medium rounded hover:bg-black active:bg-black"
          type="submit"
          value="Masuk"
        />
      </label>
      <p
        class="capitalize text-xl text-slate-800 tracking-wide font-semibold"
      ></p>
    </form>
  </section>
</template>
