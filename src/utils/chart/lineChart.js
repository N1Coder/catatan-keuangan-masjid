import { pemasukanColor, pengeluaranColor } from "./colorChart"

export const lineChartData = {
  data: {
    labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Minggu"],
    datasets: [
      {
        type: "line",
        label: "Data Pengeluaran Per-hari",
        data: [74000, 120000, 10000, 44000, 25000, 35000, 32000],
        backgroundColor: [pengeluaranColor],
        borderColor: pengeluaranColor,
        hoverOffset: 3,
      },
      {
        type: "line",
        label: "Data Pemasukan Per-hari",
        data: [54000, 20000, 25000, 14000, 5000, 52500, 72000],
        backgroundColor: [pemasukanColor],
        borderColor: pemasukanColor,
        hoverOffset: 3,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      x: {
        grid: {
          borderColor: "rgb(255 255 255 / 0.5)",
          tickColor: "rgb(255 255 255 / 0.5)",
        },
      },
    },
  },
}
