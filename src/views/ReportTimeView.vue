<script setup>
import { Icon } from "@iconify/vue"
import { computed, ref } from "vue"
import { currency } from "../utils/currency"
import { getDataByDate } from "../utils/data/getDataByDate"
</script>

<template>
  <!-- <article class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
    <article
      class="shadow-sharp border-[3px] border-black bg-white p-4 md:col-span-2 rounded-lg"
    >
      <div
        class="flex items-center justify-between text-lg font-bold text-rose-500"
      >
        <p class="capitalize">jumlah pengeluaran minggu ini</p>
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
        <p class="capitalize">jumlah pemasukan minggu ini</p>
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
  </article> -->

  <RouterLink
    class="flex items-center w-fit mt-8 button-primary"
    :to="{ name: 'report' }"
  >
    <Icon icon="ic:baseline-arrow-back-ios-new" />
    <p>kembali</p>
  </RouterLink>
</template>
