import { pengeluaranColor, pemasukanColor } from "./colorChart"

export const barChartData = {
  type: "bar",
  data: {
    labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Minggu"],
    datasets: [
      {
        label: "Data Pengeluaran Per-hari",
        data: [44000, 20000, 10000, 44000, 25000, 5000, 12000],
        backgroundColor: [pengeluaranColor],
        hoverOffset: 3,
        borderJoinStyle: "bevel",
      },
      {
        label: "Data Pemasukan Per-hari",
        data: [54000, 20000, 25000, 14000, 5000, 0, 72000],
        backgroundColor: [pemasukanColor],
        hoverOffset: 3,
        borderJoinStyle: "bevel",
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
