<script setup>
import { ref } from "vue"
import { getDataByDate } from "../../utils/data/getDataByDate"
import { daysIndonesian } from "../../utils/time/getDay"
import { getWeekDates } from "../../utils/useTime"
import BarChart from "../chart/BarChart.vue"
import { sumInDay } from "../../utils/data/dataForBar"

const dataPemasukanMingguIni = ref([]),
  dataPengeluaranMingguIni = ref([])

const dataPemasukanPerHari = ref([]),
  dataPengeluaranPerHari = ref([])

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

sumInDay(daysIndonesian, dataPemasukanMingguIni.value, dataPemasukanPerHari)

sumInDay(daysIndonesian, dataPengeluaranMingguIni.value, dataPengeluaranPerHari)
</script>

<template>
  <article
    class="shadow-sharp-lg border-4 border-black grid grid-cols-1 bg-zinc-800 p-4 gap-4"
  >
    <h2 class="capitalize text-xl font-semibold text-white">
      lihat grafik transaksi minggu ini
    </h2>

    <BarChart
      :label-data="daysIndonesian"
      :data-pemasukan="dataPemasukanPerHari"
      :data-pengeluaran="dataPengeluaranPerHari"
    />
  </article>
</template>
