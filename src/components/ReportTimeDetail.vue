<script setup>
import { Icon } from "@iconify/vue"
import { ref } from "vue";
import { useRoute } from "vue-router";
import { currency } from "../utils/currency"
import { getDataByDate } from "../utils/data/getDataByDate";
import { sortHighToLow } from "../utils/sortHighToLow";
import { daysIndonesian } from "../utils/time/getDay";
import { monthsIndonesian } from "../utils/time/getMonth";
import { sortByLatest } from "../utils/time/sortByLatest";
import { getAllData, getCategories, getDataCategoriesByDate, getAllCategoriesData } from "../utils/useData";
import { getMonthDates, getWeekDates } from "../utils/useTime";

const route = useRoute()

const totalPemasukan = ref(0),
      totalPengeluaran = ref(0)


const dataPemasukan = ref([]),
  dataPengeluaran = ref([]),
  dataCategoryPemasukan = ref([]),
  dataCategoryPengeluaran = ref([]),
  categoryPemasukan = ref([]),
  categoryPengeluaran = ref([])

const [startWeek, endWeek] = getWeekDates(),
      [startMonth, endMonth] = getMonthDates()

await getCategories("kategori_pemasukan", categoryPemasukan)
await getCategories("kategori_pengeluaran", categoryPengeluaran)

const getDataFromParams = async () => {
  switch (route.params.time) {
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
        )
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
        )
      }
      break

    case "all":
      return {
        pemasukan: await getAllData(
          "pemasukan",
          dataPemasukan,

        ),
        pengeluaran: await getAllData(
          "pengeluaran",
          dataPengeluaran,
        ),
        dataCategoryPemasukan: await getAllCategoriesData(
          "pemasukan",
          "*",
          "kategori_pemasukan",
          "*",
          dataCategoryPemasukan,
        ),
        dataCategoryPemasukan: await getAllCategoriesData(
          "pengeluaran",
          "*",
          "kategori_pengeluaran",
          "*",
          dataCategoryPengeluaran,
        )
      }
      break

    default:
      console.log("404 Not Found")
      break
  }
}

await getDataFromParams()

// for total section
dataPemasukan.value.map((pemasukan) => {
  totalPemasukan.value += Number(pemasukan.jumlah)
})

dataPengeluaran.value.map((pengeluaran) => {
  totalPengeluaran.value += Number(pengeluaran.jumlah)
})

// for category section
const sumCategoryPemasukan = (nameCategory, data) => {
  return data
    .filter((i) => i.kategori_pemasukan.id_kategori === nameCategory)
    .reduce((a, b) => Number(a) + Number(b.jumlah), 0)
}

const sumCategoryPengeluaran = (nameCategory, data) => {
  return data
    .filter((i) => i.kategori_pengeluaran.id_kategori === nameCategory)
    .reduce((a, b) => Number(a) + Number(b.jumlah), 0)
}

const showStatusTime = (params) => {
  if (params === "week") {
    return "minggu ini"
  } else if (params === "month") {
    return "bulan ini" 
  } else {
    return "keseluruhan"
  }
}

// for list transactions
const dataTransaksi = ref([...dataPemasukan.value, ...dataPengeluaran.value])

// sortHighToLow(dataTransaksi.value)
sortByLatest(dataTransaksi.value)

const showStatusTransaksi = () => {
  return 1 > 0
    ? `daftar transaksi ${showStatusTime(route.params.time)}`
    : `tidak ada transaksi untuk ${showStatusTime(route.params.time)}`
}

const showDateTransaksi = (date) => {
  const d = new Date(date)

  return `${daysIndonesian[d.getDay()]}, ${d.getDate()} ${monthsIndonesian[d.getMonth()]} ${d.getFullYear()}`
}
</script>

<template>
  <article class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
    <h2 class="capitalize text-xl font-bold text-orange-600 mb-6">
      laporan keuangan {{ showStatusTime(route.params.time) }}
    </h2>

    <article
      class="shadow-sharp border-[3px] border-black bg-white p-4 md:col-span-2 rounded-lg"
    >
      <div
        class="flex items-center justify-between text-lg font-bold text-rose-500"
      >
        <p class="capitalize">jumlah pengeluaran {{ showStatusTime(route.params.time) }}</p>
        <Icon icon="bi:arrow-up-square-fill" />
      </div>

      <div>
        <p class="mt-2 text-md font-semibold text-rose-700">
          Rp. {{ currency(totalPengeluaran) }},00
        </p>
      </div>
    </article>

    <article
      class="shadow-sharp border-[3px] border-black bg-white p-4 md:col-span-2 rounded-lg"
    >
      <div
        class="flex items-center justify-between text-lg font-bold text-emerald-500"
      >
        <p class="capitalize">jumlah pemasukan {{ showStatusTime(route.params.time) }}</p>
        <Icon icon="bi:arrow-down-square-fill" />
      </div>

      <div>
        <p class="mt-2 text-md font-semibold text-emerald-700">
          Rp. {{ currency(totalPemasukan) }},00
        </p>
      </div>
    </article>
  </article>

  <article
    class="shadow-sharp-lg border-4 border-black grid grid-cols-1 bg-rose-700 mt-10 p-4 gap-4"
  >
    <h2 class="capitalize text-xl font-semibold text-white">
      laporan kategori {{ showStatusTime(route.params.time) }}
    </h2>

    <article
      class="bg-white p-4 rounded-lg divide-y-reverse divide-y-2 divide-slate-300"
    >
      <h2 class="capitalize text-md font-semibold mb-1">
        total tiap kategori pengeluaran
      </h2>

      <div
        v-for="(pengeluaran, i) in categoryPengeluaran"
        class="flex items-center justify-between pb-1 text-lg text-rose-500 font-bold"
      >
        <p class="capitalize text-sm">
          {{ pengeluaran.nama_kategori }}
        </p>

        <p class="mt-2 text-sm text-rose-700 font-semibold">
          Rp.
          {{ currency(sumCategoryPengeluaran(i + 1, dataCategoryPengeluaran)) }},00
        </p>
      </div>
    </article>

    <article
      class="bg-white p-4 rounded-lg divide-y-reverse divide-y-2 divide-slate-300"
    >
      <h2 class="capitalize text-md font-semibold mb-1">
        total tiap kategori pemasukan
      </h2>

      <div
        v-for="(pemasukan, i) in categoryPemasukan"
        class="flex items-center justify-between pb-1 text-lg text-emerald-500 font-bold"
      >
        <p class="capitalize text-sm">
          {{ pemasukan.nama_kategori }}
        </p>

        <p class="mt-2 text-sm text-emerald-700 font-semibold">
          Rp.
          {{ currency(sumCategoryPemasukan(i + 1, dataCategoryPemasukan)) }},00
        </p>
      </div>
    </article>
  </article>

  <article class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <h2 class="capitalize text-orange-600 text-lg font-bold md:col-span-2">
        {{ showStatusTransaksi() }}
      </h2>

      <article v-for="(transaksi, i) in dataTransaksi" :key="i" class="shadow-sharp border-[3px] border-black bg-white p-4 rounded-lg">
        <p class="capitalize text-md font-bold" :class="transaksi.id_pengeluaran ? 'text-rose-600' : 'text-emerald-600'" >
          {{ transaksi.id_pengeluaran ? showDateTransaksi(transaksi.tanggal_pengeluaran) : showDateTransaksi(transaksi.tanggal_pemasukan) }}
        </p>

         <div>
           <p class="text-md font-semibold" :class="transaksi.id_pengeluaran ? 'text-rose-700' : 'text-emerald-700'" >
              <p class="capitalize" :class="transaksi.id_pengeluaran ? 'text-rose-700' : 'text-emerald-700'">
                {{ transaksi.id_pengeluaran ? transaksi.nama_pengeluaran : transaksi.nama_pemasukan }}
              </p>
              Rp. {{ currency(transaksi.jumlah) }},00
            </p>
        </div>
      </article>

  </article>
</template>
