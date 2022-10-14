export const doughnoutChartData = {
  type: "doughnut",
  data: {
    labels: ["Senin", "Selasa", "Rabu", "Kamis"],
    datasets: [
      {
        label: "Data Pengeluaran Per-hari",
        data: [74000, 120000, 150000, 44000],
        backgroundColor: [
          "rgb(234, 88, 12)",
          "rgb(13, 148, 136)",
          "rgb(40, 253, 244)",
          "rgb(124, 58, 237)",
        ],
        hoverOffset: 3,
        borderJoinStyle: "bevel",
      },
    ],
  },
  options: {
    responsive: true,
  },
}
