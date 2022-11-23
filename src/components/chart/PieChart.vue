<script setup>
// chart.js/auto so you don't have to register separate things from chart.js
import Chart from "chart.js/auto"
import { onMounted, ref } from "vue"
import { pieChartData } from "../../utils/useChart"

const props = defineProps(["dataWeek", "labelData"])
const ctx = ref(null)

onMounted(() => {
  new Chart(ctx.value, pieChartData(props.labelData, props.dataWeek))
  Chart.defaults.color = "#fff"
})
</script>

<template>
  <div>
    <canvas ref="ctx"></canvas>
  </div>
</template>
