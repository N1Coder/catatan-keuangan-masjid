import { pengeluaranColor, pemasukanColor } from "./colorChart"

export const barChartData = (
  labelData,
  dataNumberPemasukan,
  dataNumberPengeluaran
) => {
  return {
    type: "bar",
    data: {
      labels: labelData,
      datasets: [
        {
          label: "Data Pengeluaran Per-hari",
          data: dataNumberPengeluaran,
          backgroundColor: [pengeluaranColor],
          hoverOffset: 3,
          borderJoinStyle: "bevel",
        },
        {
          label: "Data Pemasukan Per-hari",
          data: dataNumberPemasukan,
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
}
