<script setup>
import { Icon } from "@iconify/vue"
import { ref } from "vue"
import { currency } from "../utils/currency"
import { getAllData } from "../utils/useData"

const jumlahSemuaPemasukan = ref(null),
  jumlahSemuaPengeluaran = ref(null)

const dataSemuaPemasukan = ref([])
const dataSemuaPengeluaran = ref([])

await getAllData("pemasukan", dataSemuaPemasukan)
await getAllData("pengeluaran", dataSemuaPengeluaran)

dataSemuaPemasukan.value.map((pemasukan) => {
  jumlahSemuaPemasukan.value += Number(pemasukan.jumlah_pemasukan)
})

dataSemuaPengeluaran.value.map((pengeluaran) => {
  jumlahSemuaPengeluaran.value += Number(pengeluaran.jumlah_pengeluaran)
})
</script>

<template>
  <article
    class="shadow-sharp-lg border-4 border-black grid grid-cols-1 bg-red-500 p-4 gap-4"
  >
    <h2 class="capitalize text-xl font-semibold text-white">total transaksi</h2>

    <article class="bg-white p-4 rounded-lg">
      <div
        class="flex items-center justify-between text-md text-rose-500 font-bold"
      >
        <p class="capitalize">pengeluaran</p>
        <Icon icon="bi:arrow-up-square-fill" />
      </div>
      <div>
        <p class="mt-2 text-base text-rose-700 font-semibold">
          Rp. {{ currency(jumlahSemuaPengeluaran) }},00
        </p>
      </div>
    </article>

    <article class="bg-white p-4 rounded-lg">
      <div
        class="flex items-center justify-between text-md text-emerald-500 font-bold"
      >
        <p class="capitalize">pemasukan</p>
        <Icon icon="bi:arrow-down-square-fill" />
      </div>
      <div>
        <p class="mt-2 text-base text-emerald-700 font-semibold">
          Rp. {{ currency(jumlahSemuaPemasukan) }},00
        </p>
      </div>
    </article>
  </article>
</template>
