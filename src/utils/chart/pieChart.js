import { pemasukanColor, pengeluaranColor } from "./colorChart"

export const pieChartData = {
  type: "pie",
  data: {
    labels: ["Total Pengeluaran Per-minggu", "Total Pemasukan Per-minggu"],
    datasets: [
      {
        label: "Data Pengeluaran Per-hari",
        data: [423000, 520000],
        backgroundColor: [pengeluaranColor, pemasukanColor],
        hoverOffset: 4,
        borderJoinStyle: "bevel",
        borderWidth: 1,
        weight: 2,
      },
    ],
  },
  options: {
    responsive: true,
  },
}
