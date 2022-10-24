<script setup>
import { Icon } from "@iconify/vue"
import { computed, ref } from "vue"
import { currency } from "../../utils/currency"
import { getAllData, getDataToday } from "../../utils/useData"
import {
  dataPemasukanHariIni,
  dataPengeluaranHariIni,
} from "../../utils/useData"

const totalPemasukan = ref(0),
  totalPengeluaran = ref(0),
  jumlahSemuaPemasukan = ref(0),
  jumlahSemuaPengeluaran = ref(0)

const dataSemuaPemasukan = ref([]),
  dataSemuaPengeluaran = ref([])

await getAllData("pemasukan", dataSemuaPemasukan)
await getAllData("pengeluaran", dataSemuaPengeluaran)

dataSemuaPemasukan.value.map((pemasukan) => {
  jumlahSemuaPemasukan.value += Number(pemasukan.jumlah)
})

dataSemuaPengeluaran.value.map((pengeluaran) => {
  jumlahSemuaPengeluaran.value += Number(pengeluaran.jumlah)
})

await getDataToday(
  "pemasukan",
  "jumlah",
  "tanggal_pemasukan",
  dataPemasukanHariIni
)
await getDataToday(
  "pengeluaran",
  "jumlah",
  "tanggal_pengeluaran",
  dataPengeluaranHariIni
)

console.log(dataPemasukanHariIni.value)

dataPemasukanHariIni.value.map((pemasukan) => {
  totalPemasukan.value += Number(pemasukan.jumlah)
})

dataPengeluaranHariIni.value.map((pengeluaran) => {
  totalPengeluaran.value += Number(pengeluaran.jumlah)
})

const anggaranSaatIni = computed(() => {
  return jumlahSemuaPemasukan.value - jumlahSemuaPengeluaran.value
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
          Rp. {{ currency(anggaranSaatIni) || 0 }},00
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
        <p class="capitalize">jumlah pemasukan hari ini</p>
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