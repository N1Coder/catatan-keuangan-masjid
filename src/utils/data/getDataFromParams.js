import { ref } from "vue"
import {
  getWeekDates,
  getMonthDates,
  getLastMonthDates,
  getLastWeekDates,
} from "../useTime"
import { getDataByDate } from "../data/getDataByDate"
import {
  getAllData,
  getDataCategoriesByDate,
  getAllCategoriesData,
  dataNotif,
} from "../useData"
import { getSaldo } from "../data/getDataSaldo"
import { dateForQuery } from "../time/handleDate"

const saldoAwal = ref(0),
  saldoAkhir = ref(0)

// store data
const dataPemasukan = ref([]),
  dataPengeluaran = ref([]),
  dataCategoryPemasukan = ref([]),
  dataCategoryPengeluaran = ref([]),
  dataSaldoAwal = ref([]),
  dataSaldoAkhir = ref([])

// get range week / month
const [startWeek, endWeek] = getWeekDates(),
  [startMonth, endMonth] = getMonthDates()

// get last day of week / month
const lastDayOfWeek = getLastWeekDates(),
  lastDayOfMonth = getLastMonthDates()

const dateWeek = new Date(lastDayOfWeek),
  dateMonth = new Date(lastDayOfMonth)

const formattedLastDateWeek = `${dateWeek.getFullYear()}-${
    dateWeek.getMonth() + 1
  }-${dateWeek.getDate()}`,
  formattedLastDateMonth = `${dateMonth.getFullYear()}-${
    dateMonth.getMonth() + 1
  }-${dateMonth.getDate()}`

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
        saldoAwalMinggu: await getSaldo(
          "saldo",
          "jumlah_saldo",
          "waktu",
          dataSaldoAwal,
          formattedLastDateWeek
        ),
        saldoAkhirMinggu: await getSaldo(
          "saldo",
          "jumlah_saldo",
          "waktu",
          dataSaldoAkhir,
          dateForQuery
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
        saldoAwalBulan: await getSaldo(
          "saldo",
          "jumlah_saldo",
          "waktu",
          dataSaldoAwal,
          formattedLastDateMonth
        ),
        saldoAkhirBulan: await getSaldo(
          "saldo",
          "jumlah_saldo",
          "waktu",
          dataSaldoAkhir,
          dateForQuery
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
  dataSaldoAwal,
  dataSaldoAkhir,
  saldoAwal,
  saldoAkhir,
}
