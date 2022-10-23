export const sortByLatest = (arr) => {
  const newArr = arr.sort((a, b) => {
    const dateA = new Date(a.tanggal_pengeluaran ?? a.tanggal_pemasukan)
    const dateB = new Date(b.tanggal_pengeluaran ?? b.tanggal_pemasukan)

    return dateB - dateA
  })

  return newArr
}
