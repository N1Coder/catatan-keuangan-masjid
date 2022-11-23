export const sumInDay = (dayData, date, dataSum) => {
  dayData.forEach((day) => {
    let total = 0

    date.forEach((items) => {
      const d = new Date(items.tanggal_pemasukan ?? items.tanggal_pengeluaran)
      const formattedDay = dayData[d.getDay()]

      if (day === formattedDay) {
        total += Number(items.jumlah)
      }
    })

    dataSum.value.push(total)
  })
}
