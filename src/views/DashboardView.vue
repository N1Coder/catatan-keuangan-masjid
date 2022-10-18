<script setup>
import { dateToday } from "../utils/useTime"
import { ref } from "vue"
import InfoTransaction from "../components/InfoTransaction.vue"
import LoadingInfoTransaction from "../components/loading/LoadingInfoTransaction.vue"

const tambahTransaksi = ref(null)
</script>

<template>
  <section>
    <header>
      <h1 class="capitalize text-xl md:text-2xl text-orange-600 font-bold">
        overview keuangan masjid Al-Fadhilah
      </h1>
      <p class="text-md md:text-lg text-orange-500 font-semibold">
        Hari ini, {{ dateToday }}
      </p>
    </header>

    <Suspense>
      <template #default>
        <InfoTransaction />
      </template>

      <template #fallback>
        <LoadingInfoTransaction />
      </template>
    </Suspense>

    <RouterLink
      ref="tambahTransaksi"
      class="inline-block mt-6 button-primary"
      :to="{ name: 'transactions' }"
    >
      tambah transaksi
    </RouterLink>

    <!-- <article class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <h2 class="capitalize text-orange-600 text-lg font-bold md:col-span-2">
        daftar transaksi hari ini
      </h2>

      <article v-for="(transaksi, i) in listTransaksi" :key="i" class="shadow-sharp border-[3px] border-black bg-white p-4 rounded-lg">
      <div>
        <p class="text-md font-semibold" :class="transaksi.jenisTransaksi === 'pengeluaran' ? 'text-rose-700' : 'text-emerald-700'">
            <p class="capitalize" :class="transaksi.jenisTransaksi === 'pengeluaran' ? 'text-rose-500' : 'text-emerald-500'">{{ transaksi.namaTransaksi }}</p>
            Rp. {{ currency(transaksi.nominalTransaksi) }},00
          </p>
        </div>
      </article>

    </article> -->
  </section>
</template>
