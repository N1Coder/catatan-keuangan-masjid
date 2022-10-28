import { pemasukanColor, pengeluaranColor } from "./colorChart"

export const lineChartData = (
  labelData,
  dataNumberPemasukan,
  dataNumberPengeluaran
) => {
  return {
    data: {
      labels: labelData,
      datasets: [
        {
          type: "line",
          label: "Data Pengeluaran Per-hari",
          data: dataNumberPengeluaran,
          backgroundColor: [pengeluaranColor],
          borderColor: pengeluaranColor,
          hoverOffset: 3,
        },
        {
          type: "line",
          label: "Data Pemasukan Per-hari",
          data: dataNumberPemasukan,
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
}
