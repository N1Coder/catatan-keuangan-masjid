import { ref } from "vue"
import { getWeekDates, getMonthDates } from "../useTime"
import { getDataByDate } from "../data/getDataByDate"
import {
  getAllData,
  getDataCategoriesByDate,
  getAllCategoriesData,
} from "../useData"

const saldoAwal = ref(0),
  saldoAkhir = ref(0)

// store data
const dataPemasukan = ref([]),
  dataPengeluaran = ref([]),
  dataCategoryPemasukan = ref([]),
  dataCategoryPengeluaran = ref([]),
  dataSaldo = ref([])

const [startWeek, endWeek] = getWeekDates(),
  [startMonth, endMonth] = getMonthDates()

export const getDataFromParams = async (routeParams) => {
  switch (routeParams) {
    case "week":
      return {
        pemasukan: await getDataByDate(
          "pemasukan",
          "*",
          dataPemasukan,
          "tanggal_pemasukan",
          startWeek,
          endWeek
        ),
        pengeluaran: await getDataByDate(
          "pengeluaran",
          "*",
          dataPengeluaran,
          "tanggal_pengeluaran",
          startWeek,
          endWeek
        ),
        dataCategoryPemasukan: await getDataCategoriesByDate(
          "pemasukan",
          "jumlah",
          "kategori_pemasukan",
          "*",
          dataCategoryPemasukan,
          "tanggal_pemasukan",
          startWeek,
          endWeek
        ),
        dataCategoryPengeluaran: await getDataCategoriesByDate(
          "pengeluaran",
          "jumlah",
          "kategori_pengeluaran",
          "*",
          dataCategoryPengeluaran,
          "tanggal_pengeluaran",
          startWeek,
          endWeek
        ),
      }
      break

    case "month":
      return {
        pemasukan: await getDataByDate(
          "pemasukan",
          "*",
          dataPemasukan,
          "tanggal_pemasukan",
          startMonth,
          endMonth
        ),
        pengeluaran: await getDataByDate(
          "pengeluaran",
          "*",
          dataPengeluaran,
          "tanggal_pengeluaran",
          startMonth,
          endMonth
        ),
        dataCategoryPemasukan: await getDataCategoriesByDate(
          "pemasukan",
          "jumlah",
          "kategori_pemasukan",
          "*",
          dataCategoryPemasukan,
          "tanggal_pemasukan",
          startMonth,
          endMonth
        ),
        dataCategoryPengeluaran: await getDataCategoriesByDate(
          "pengeluaran",
          "jumlah",
          "kategori_pengeluaran",
          "*",
          dataCategoryPengeluaran,
          "tanggal_pengeluaran",
          startMonth,
          endMonth
        ),
        saldo: await getDataByDate(
          "saldo",
          "*",
          dataSaldo,
          "waktu",
          startMonth,
          endMonth
        ),
      }
      break

    case "all":
      return {
        pemasukan: await getAllData("pemasukan", dataPemasukan),
        pengeluaran: await getAllData("pengeluaran", dataPengeluaran),
        dataCategoryPemasukan: await getAllCategoriesData(
          "pemasukan",
          "*",
          "kategori_pemasukan",
          "*",
          dataCategoryPemasukan
        ),
        dataCategoryPemasukan: await getAllCategoriesData(
          "pengeluaran",
          "*",
          "kategori_pengeluaran",
          "*",
          dataCategoryPengeluaran
        ),
      }
      break

    default:
      console.log("404 Not Found")
      dataNotif.value.push({
        id: Math.trunc(Math.random() * 100),
        success: false,
        message: `Data tidak ditemukan`,
      })
      break
  }
}

export {
  dataPemasukan,
  dataPengeluaran,
  dataCategoryPemasukan,
  dataCategoryPengeluaran,
  dataSaldo,
  saldoAwal,
  saldoAkhir,
}
