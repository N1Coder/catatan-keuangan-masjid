<script setup>
import { Icon } from "@iconify/vue"
import { computed, ref } from "vue"
import { currency } from "../utils/currency"
import { getDataToday } from "../utils/data/getDataToday"
import { dataPemasukanHariIni, dataPengeluaranHariIni } from "../utils/useData"

const totalPemasukan = ref(null),
  totalPengeluaran = ref(null)

await getDataToday(
  "pemasukan",
  "jumlah_pemasukan",
  "tanggal_pemasukan",
  dataPemasukanHariIni
)
await getDataToday(
  "pengeluaran",
  "jumlah_pengeluaran",
  "tanggal_pengeluaran",
  dataPengeluaranHariIni
)

dataPemasukanHariIni.value.map((pemasukan) => {
  totalPemasukan.value += Number(pemasukan.jumlah_pemasukan)
})

dataPengeluaranHariIni.value.map((pengeluaran) => {
  totalPengeluaran.value += Number(pengeluaran.jumlah_pengeluaran)
})

const anggaranSaatIni = computed(() => {
  return totalPemasukan.value - totalPengeluaran.value
})
</script>

<template>
  <article class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
    <article
      class="shadow-sharp border-[3px] border-black bg-white p-4 md:col-span-2 rounded-lg"
    >
      <div
        class="flex items-center justify-between text-lg font-bold text-slate-500"
      >
        <p class="capitalize">jumlah anggaran saat ini</p>
        <Icon icon="bi:info-circle-fill" />
      </div>

      <div>
        <p class="mt-2 text-md font-semibold text-slate-700">
          Rp. {{ currency(anggaranSaatIni) }},00
        </p>
      </div>
    </article>

    <article
      class="shadow-sharp border-[3px] border-black bg-white p-4 md:col-span-2 rounded-lg"
    >
      <div
        class="flex items-center justify-between text-lg font-bold text-rose-500"
      >
        <p class="capitalize">jumlah pengeluaran hari ini</p>
        <Icon icon="bi:arrow-up-square-fill" />
      </div>

      <div>
        <p class="mt-2 text-md font-semibold text-rose-700">
          Rp. {{ currency(totalPengeluaran) }},00
        </p>
      </div>
    </article>

    <article
      class="shadow-sharp border-[3px] border-black bg-white p-4 md:col-span-2 rounded-lg"
    >
      <div
        class="flex items-center justify-between text-lg font-bold text-emerald-500"
      >
        <p class="capitalize">jumlah pemasukan ini</p>
        <Icon icon="bi:arrow-down-square-fill" />
      </div>

      <div>
        <p class="mt-2 text-md font-semibold text-emerald-700">
          Rp. {{ currency(totalPemasukan) }},00
        </p>
      </div>
    </article>
  </article>
</template>
