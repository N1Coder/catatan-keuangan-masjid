<script setup>
import { Icon } from "@iconify/vue"
import { ref } from "vue";
import { useRoute } from "vue-router";
import { currency } from "../../utils/currency"
import { getDataFromParams, dataPemasukan, dataPengeluaran, dataCategoryPemasukan,dataCategoryPengeluaran } from "../../utils/data/getDataFromParams";
import { daysIndonesian } from "../../utils/time/getDay";
import { monthsIndonesian } from "../../utils/time/getMonth";
import { sortByLatest } from "../../utils/time/sortByLatest";
import { getCategories } from "../../utils/useData";
import { deleteData, updateData } from "../../utils/useActions"

const route = useRoute()

const totalPemasukan = ref(0),
  totalPengeluaran = ref(0)

const categoryPemasukan = ref([]),
  categoryPengeluaran = ref([])

await getCategories("kategori_pemasukan", categoryPemasukan)
await getCategories("kategori_pengeluaran", categoryPengeluaran)

// get data based on url params
await getDataFromParams(route.params.time)

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

// sort data from latest date
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
  <article class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <h2 class="capitalize text-2xl font-bold text-orange-600 mb-6">
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

  <article class="relative mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <h2 class="capitalize text-orange-600 text-lg font-bold md:col-span-2">
        {{ showStatusTransaksi() }}
      </h2>

    <transition-group name="list">
      <article
        v-for="(transaksi, i) in dataTransaksi"
        :key="transaksi.id_pengeluaran ?? transaksi.id_pemasukan"
        class="relative shadow-sharp border-[3px] border-black bg-white p-4 rounded-lg"
      >
        <p
          :class="transaksi.id_pengeluaran ? 'text-rose-600' : 'text-emerald-600'"
          class="flex items-center gap-x-1 mb-1 capitalize text-md font-bold"
        >
          <Icon icon="bxs:right-arrow" />
          {{ transaksi.id_pengeluaran ? showDateTransaksi(transaksi.tanggal_pengeluaran) : showDateTransaksi(transaksi.tanggal_pemasukan) }}
        </p>

         <div class="flex items-center">
           <p
             :class="transaksi.id_pengeluaran ? 'text-rose-700' : 'text-emerald-700'"
             class="text-md font-semibold"
           >
              <p
                :class="transaksi.id_pengeluaran ? 'text-rose-700' : 'text-emerald-700'"
                class="capitalize"
              >
                {{ transaksi.id_pengeluaran ? transaksi.nama_pengeluaran : transaksi.nama_pemasukan }} 
              </p>
              Rp. {{ currency(transaksi.jumlah) }},00
           </p>

            <button
              class="button-action-edit"
            >
              <Icon icon="fluent:document-edit-24-filled" />
            </button>

            <button
              @click="deleteData(
                transaksi.id_pengeluaran ? 'pengeluaran' : 'pemasukan',
                transaksi.id_pengeluaran ? 'id_pengeluaran' : 'id_pemasukan',
                transaksi.id_pengeluaran ?? transaksi.id_pemasukan,
                dataTransaksi, 
                i
              )"
              class="button-action-delete"
            >
              <Icon icon="fluent:delete-24-filled" />
            </button>
        </div>
      </article>
    </transition-group>


  </article>
</template>
