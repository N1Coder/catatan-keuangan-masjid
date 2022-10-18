export const currency = (harga = 0) => {
  let rupiah = harga.toString().replace(/\D/g, "")
  let hasil = rupiah.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  return hasil
}
