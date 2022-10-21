import { pemasukanColor, pengeluaranColor } from "./colorChart"

export const pieChartData = (labelData, dataNumber) => {
  return {
    type: "pie",
    data: {
      labels: labelData,
      datasets: [
        {
          label: "Data Pengeluaran Per-hari",
          data: dataNumber,
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
}
