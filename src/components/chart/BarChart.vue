<script setup>
// chart.js/auto so you don't have to register separate things from chart.js
import Chart from "chart.js/auto"
import { onMounted, ref } from "vue"
import { barChartData } from "../../utils/useChart"

const props = defineProps(["labelData", "dataPemasukan", "dataPengeluaran"])
const ctx = ref(null)

onMounted(() => {
  new Chart(
    ctx.value,
    barChartData(props.labelData, props.dataPemasukan, props.dataPengeluaran)
  )
  Chart.defaults.color = "#fff"
})
</script>

<template>
  <div class="text-emerald-500">
    <canvas ref="ctx"></canvas>
  </div>
</template>
