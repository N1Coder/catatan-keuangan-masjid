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
      class="bg-white dark:bg-slate-900 flex flex-col rounded shadow-sharp-lg border-[3px] border-black mt-24 p-8 px-6 gap-6 text-slate-800 dark:text-slate-200 md:max-w-md md:mx-auto"
      @submit.prevent="handleLogin(dataLogin)"
    >
      <h2 class="text-2xl font-bold dark:text-slate-200">Sign in CaKeMas</h2>
      <label>
        <p
          class="capitalize text-xl tracking-wide font-semibold dark:text-slate-200"
        >
          email
        </p>

        <input
          class="bg-slate-200 dark:bg-slate-800 rounded w-full py-2 px-3 focus:outline-4 focus:outline-orange-400 focus:bg-slate-100 dark:focus:bg-slate-700 dark:placeholder:text-slate-300/50"
          placeholder="Masukkan email anda"
          required
          v-model="dataLogin.email"
          type="email"
        />
      </label>

      <label>
        <p
          class="capitalize text-xl tracking-wide font-semibold dark:text-slate-200"
        >
          kata sandi
        </p>

        <input
          class="bg-slate-200 dark:bg-slate-800 rounded w-full py-2 px-3 focus:outline-4 focus:outline-orange-400 focus:bg-slate-100 dark:focus:bg-slate-700 dark:placeholder:text-slate-300/50"
          placeholder="Masukkan kata sandi anda"
          required
          v-model="dataLogin.password"
          type="password"
        />
      </label>

      <label>
        <input
          class="bg-slate-800 dark:bg-slate-200 px-6 py-2 text-slate-100 dark:text-slate-800 font-medium rounded hover:bg-black active:bg-black dark:hover:bg-slate-100 dark:active:bg-slate-100"
          type="submit"
          value="Masuk"
        />
      </label>
      <p
        class="capitalize text-xl text-slate-800 dark:text-slate-200 tracking-wide font-semibold"
      ></p>
    </form>
  </section>
</template>
