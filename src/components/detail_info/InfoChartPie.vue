<script setup>
import { Icon } from "@iconify/vue"
import { ref } from "vue"
import { currency } from "../../utils/currency"
import { getDataByDate } from "../../utils/data/getDataByDate"
import { getWeekDates } from "../../utils/useTime"
import PieChart from "../chart/PieChart.vue"

const jumlahPemasukanMingguIni = ref(0),
  jumlahPengeluaranMingguIni = ref(0)

const dataPemasukanMingguIni = ref([]),
  dataPengeluaranMingguIni = ref([])

// filter data by week
const [startWeek, endWeek] = getWeekDates()

await getDataByDate(
  "pemasukan",
  "*",
  dataPemasukanMingguIni,
  "tanggal_pemasukan",
  startWeek,
  endWeek
)
await getDataByDate(
  "pengeluaran",
  "*",
  dataPengeluaranMingguIni,
  "tanggal_pengeluaran",
  startWeek,
  endWeek
)

dataPemasukanMingguIni.value.map((pemasukan) => {
  jumlahPemasukanMingguIni.value += Number(pemasukan.jumlah)
})

dataPengeluaranMingguIni.value.map((pengeluaran) => {
  jumlahPengeluaranMingguIni.value += Number(pengeluaran.jumlah)
})

console.log(jumlahPemasukanMingguIni.value, jumlahPengeluaranMingguIni.value)

// data for pie
const dataLabelPie = ref([
  "Jumlah Pengeluaran Minggu Ini",
  "Jumlah Pemasukan Minggu Ini",
])
const dataPieWeek = ref([
  jumlahPengeluaranMingguIni.value,
  jumlahPemasukanMingguIni.value,
])
</script>

<template>
  <article
    class="shadow-sharp-lg border-4 border-black grid grid-cols-1 bg-slate-800 p-4 gap-4 lg:row-span-2"
  >
    <h2 class="capitalize text-xl font-semibold text-white">
      perbandingan jumlah transaksi minggu ini
    </h2>

    <PieChart :data-week="dataPieWeek" :label-data="dataLabelPie" />

    <div class="flex items-center justify-between bg-white p-4 rounded-lg">
      <div class="flex items-center gap-x-2 text-md text-rose-500 font-bold">
        <p class="capitalize">pengeluaran</p>
        <Icon icon="bi:arrow-up-square-fill" />
      </div>
      <p class="text-base text-rose-700 font-semibold">
        Rp. {{ currency(jumlahPengeluaranMingguIni) }},00
      </p>
    </div>
    <div class="flex items-center justify-between bg-white p-4 rounded-lg">
      <div class="flex items-center gap-x-2 text-md text-emerald-500 font-bold">
        <p class="capitalize">pemasukan</p>
        <Icon icon="bi:arrow-down-square-fill" />
      </div>
      <p class="text-base text-emerald-700 font-semibold">
        Rp. {{ currency(jumlahPemasukanMingguIni) }},00
      </p>
    </div>
  </article>
</template>
