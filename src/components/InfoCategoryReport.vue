<script setup>
import { computed } from "@vue/reactivity"
import { ref } from "vue"
import { currency } from "../utils/currency"
import { getCategories, getDataCategories } from "../utils/useData"

const categoryPemasukan = ref([]),
  categoryPengeluaran = ref([])

const dataCategoryPemasukan = ref([]),
  dataCategoryPengeluaran = ref([])

await getCategories("kategori_pemasukan", categoryPemasukan)
await getCategories("kategori_pengeluaran", categoryPengeluaran)

await getDataCategories(
  "pemasukan",
  "jumlah_pemasukan",
  "kategori_pemasukan",
  "*",
  dataCategoryPemasukan,
  "tanggal_pemasukan"
)
await getDataCategories(
  "pengeluaran",
  "jumlah_pengeluaran",
  "kategori_pengeluaran",
  "*",
  dataCategoryPengeluaran,
  "tanggal_pengeluaran"
)

const sumCategoryPemasukan = (nameCategory, data) => {
  return data
    .filter((i) => i.kategori_pemasukan.id_kategori === nameCategory)
    .reduce((a, b) => Number(a) + Number(b.jumlah_pemasukan), 0)
}

const sumCategoryPengeluaran = (nameCategory, data) => {
  return data
    .filter((i) => i.kategori_pengeluaran.id_kategori === nameCategory)
    .reduce((a, b) => Number(a) + Number(b.jumlah_pengeluaran), 0)
}
</script>

<template>
  <article
    class="shadow-sharp-lg border-4 border-black grid grid-cols-1 bg-amber-400 p-4 gap-4"
  >
    <h2 class="capitalize text-xl font-semibold text-white">jenis kategori</h2>

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
          {{
            currency(sumCategoryPengeluaran(i + 1, dataCategoryPengeluaran))
          }},00
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
</template>
