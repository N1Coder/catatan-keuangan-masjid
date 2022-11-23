export const sortHighToLow = (arr) => {
  const newArr = arr.sort((a, b) => b.jumlah - a.jumlah)

  return newArr
}
