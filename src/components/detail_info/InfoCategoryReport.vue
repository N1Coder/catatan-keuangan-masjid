<script setup>
import { ref } from "vue"
import { currency } from "../../utils/currency"
import { getCategories, getDataCategories } from "../../utils/useData"

const categoryPemasukan = ref([]),
  categoryPengeluaran = ref([])

const dataCategoryPemasukan = ref([]),
  dataCategoryPengeluaran = ref([])

await getCategories("kategori_pemasukan", categoryPemasukan)
await getCategories("kategori_pengeluaran", categoryPengeluaran)

await getDataCategories(
  "pemasukan",
  "jumlah",
  "kategori_pemasukan",
  "*",
  dataCategoryPemasukan,
  "tanggal_pemasukan"
)
await getDataCategories(
  "pengeluaran",
  "jumlah",
  "kategori_pengeluaran",
  "*",
  dataCategoryPengeluaran,
  "tanggal_pengeluaran"
)

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
</script>

<template>
  <article
    class="shadow-sharp-lg border-4 border-black grid grid-cols-1 lg:grid-cols-2 bg-amber-400 p-4 lg:p-6 gap-4"
  >
    <h2
      class="capitalize text-xl lg:text-2xl font-semibold text-white lg:col-span-2"
    >
      laporan kategori hari ini
    </h2>

    <article
      class="bg-white p-4 rounded-lg divide-y-reverse divide-y-2 divide-slate-300"
    >
      <h2 class="capitalize text-md lg:text-lg lg:mb-4 font-semibold mb-1">
        total tiap kategori pengeluaran
      </h2>

      <div
        v-for="(pengeluaran, i) in categoryPengeluaran"
        class="flex items-center justify-between pb-1 lg:pb-2 text-lg lg:text-xl text-rose-500 font-bold"
      >
        <p class="capitalize text-sm lg:text-base">
          {{ pengeluaran.nama_kategori }}
        </p>

        <p class="mt-2 text-sm lg:text-base text-rose-700 font-semibold">
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
      <h2 class="capitalize text-md lg:text-lg lg:mb-4 font-semibold mb-1">
        total tiap kategori pemasukan
      </h2>

      <div
        v-for="(pemasukan, i) in categoryPemasukan"
        class="flex items-center justify-between pb-1 lg:pb-2 text-lg text-emerald-500 font-bold"
      >
        <p class="capitalize text-sm lg:text-base">
          {{ pemasukan.nama_kategori }}
        </p>

        <p class="mt-2 text-sm lg:text-base text-emerald-700 font-semibold">
          Rp.
          {{ currency(sumCategoryPemasukan(i + 1, dataCategoryPemasukan)) }},00
        </p>
      </div>
    </article>
  </article>
</template>
