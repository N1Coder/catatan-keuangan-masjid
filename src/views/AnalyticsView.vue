<script setup>
import { Icon } from "@iconify/vue"
import PieChart from "../components/PieChart.vue"
import BarChart from "../components/BarChart.vue"
import { onMounted, ref } from "vue"
import gsap from "gsap"
import LineChart from "../components/LineChart.vue"

const pieChart = ref(null),
  barChart = ref(null),
  lineChart = ref(null)

onMounted(() => {
  gsap.fromTo(
    pieChart.value,
    {
      opacity: 0,
      x: 25,
    },
    {
      opacity: 1,
      x: 0,
      delay: 0.25,
    }
  )
  gsap.fromTo(
    barChart.value,
    {
      opacity: 0,
      x: -25,
    },
    {
      opacity: 1,
      x: 0,
      delay: 0.5,
    }
  )
  gsap.fromTo(
    lineChart.value,
    {
      opacity: 0,
      x: 25,
    },
    {
      opacity: 1,
      x: 0,
      delay: 0.75,
    }
  )
})
</script>

<template>
  <section class="grid grid-cols-1 gap-8">
    <h1 class="capitalize text-2xl font-bold text-orange-600">
      grafik keuangan
    </h1>

    <article
      ref="pieChart"
      class="shadow-sharp-lg border-4 border-black grid grid-cols-1 bg-slate-800 p-4 gap-4"
    >
      <h2 class="capitalize text-xl font-semibold text-white">
        perbandingan jumlah transaksi minggu ini
      </h2>

      <PieChart />

      <div
        ref="pengeluaran"
        class="flex items-center justify-between bg-white p-4 rounded-lg"
      >
        <div class="flex items-center gap-x-2 text-md text-rose-500 font-bold">
          <p class="capitalize">pengeluaran</p>
          <Icon icon="bi:arrow-up-square-fill" />
        </div>
        <p class="text-base text-rose-700 font-semibold">Rp. 423.000,00</p>
      </div>
      <div
        ref="pemasukan"
        class="flex items-center justify-between bg-white p-4 rounded-lg"
      >
        <div
          class="flex items-center gap-x-2 text-md text-emerald-500 font-bold"
        >
          <p class="capitalize">pemasukan</p>
          <Icon icon="bi:arrow-down-square-fill" />
        </div>
        <p class="text-base text-emerald-700 font-semibold">Rp. 520.000,00</p>
      </div>
    </article>
    <article
      ref="barChart"
      class="shadow-sharp-lg border-4 border-black grid grid-cols-1 bg-zinc-800 p-4 gap-4"
    >
      <h2 class="capitalize text-xl font-semibold text-white">
        lihat grafik transaksi minggu ini
      </h2>

      <BarChart />
    </article>
    <article
      ref="lineChart"
      class="shadow-sharp-lg border-4 border-black grid grid-cols-1 bg-stone-800 p-4 gap-4"
    >
      <h2 class="capitalize text-xl font-semibold text-white">
        lihat grafik transaksi minggu ini
      </h2>

      <LineChart />
    </article>
  </section>
</template>
