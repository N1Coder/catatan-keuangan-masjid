<script setup>
import { Icon } from "@iconify/vue"
</script>

<template>
  <section class="p-dekstop">
    <header>
      <h1
        class="capitalize text-xl lg:text-3xl font-bold text-orange-600 dark:text-slate-100 mb-6"
      >
        tambah transaksi keuangan
      </h1>
    </header>

    <article class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <RouterLink
        :to="{ name: 'addpemasukan' }"
        class="button-primary flex items-center justify-between"
      >
        <p>tambah pemasukan</p>
        <Icon class="text-2xl text-green-600" icon="uil:money-withdraw" />
      </RouterLink>

      <RouterLink
        :to="{ name: 'addpengeluaran' }"
        class="button-primary flex items-center justify-between"
      >
        <p>tambah pengeluaran</p>
        <Icon class="text-2xl text-red-600" icon="uil:money-insert" />
      </RouterLink>
    </article>
  </section>
</template>
