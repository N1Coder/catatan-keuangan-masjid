<script setup>
// chart.js/auto so you don't have to register separate things from chart.js
import Chart from "chart.js/auto"
import { onMounted, ref } from "vue"
import { lineChartData } from "../../utils/useChart"

const props = defineProps(["labelData", "dataPemasukan", "dataPengeluaran"])
const ctx = ref(null)

onMounted(() => {
  new Chart(
    ctx.value,
    lineChartData(props.labelData, props.dataPemasukan, props.dataPengeluaran)
  )
  Chart.defaults.color = "#fff"
})
</script>

<template>
  <div>
    <canvas ref="ctx"></canvas>
  </div>
</template>
