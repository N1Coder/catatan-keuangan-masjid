<script setup>
import { ref } from "vue"
import LoadingInfoReport from "../components/loading/LoadingInfoReport.vue"
import InfoReport from "../components/InfoReport.vue"
import InfoCategoryReport from "../components/InfoCategoryReport.vue"

const totalTransaksi = ref(null),
  jenisKategori = ref(null),
  aksiTransaksi = ref(null)

const dataJenisKategoriPengeluaran = ref([
  {
    namaKategori: "tagihan",
    totalJumlahUang: "700000",
    jenisTransaksi: "pengeluaran",
  },
  {
    namaKategori: "biaya operasional",
    totalJumlahUang: "1150000",
    jenisTransaksi: "pengeluaran",
  },
  {
    namaKategori: "lain-lain",
    totalJumlahUang: "422000",
    jenisTransaksi: "pengeluaran",
  },
])

const dataJenisKategoriPemasukan = ref([
  {
    namaKategori: "uang kas",
    totalJumlahUang: "250000",
    jenisTransaksi: "pemasukan",
  },
  {
    namaKategori: "sumbangan",
    totalJumlahUang: "50000",
    jenisTransaksi: "pemasukan",
  },
])
</script>

<template>
  <section>
    <header>
      <h1 class="capitalize text-2xl font-bold text-orange-600 mb-6">
        laporan keuangan
      </h1>
    </header>

    <section class="grid grid-cols-1 gap-y-12">
      <Suspense>
        <template #default>
          <InfoReport />
        </template>

        <template #fallback>
          <LoadingInfoReport :background="'bg-red-500'">
            <div
              class="w-2/5 h-4 rounded-full animate-pulse bg-slate-300"
            ></div>

            <article v-for="index in 2" class="bg-white p-4 rounded-lg">
              <div class="flex items-center justify-between">
                <div
                  class="w-2/3 h-4 rounded-full bg-slate-300 animate-pulse"
                ></div>
                <div
                  class="w-4 aspect-square rounded-full bg-slate-300 animate-pulse"
                ></div>
              </div>
              <div>
                <div
                  class="mt-2 w-1/3 h-4 rounded-full bg-slate-300 animate-pulse"
                ></div>
              </div>
            </article>
          </LoadingInfoReport>
        </template>
      </Suspense>

      <Suspense>
        <template #default>
          <InfoCategoryReport />
        </template>

        <template #fallback>
          <LoadingInfoReport :background="'bg-amber-400'">
            <div
              class="w-8/12 h-4 rounded-full animate-pulse bg-slate-300"
            ></div>

            <article
              v-for="index in 2"
              :key="index"
              class="bg-white p-4 rounded-lg"
            >
              <div
                class="w-1/3 h-4 rounded-full animate-pulse bg-slate-300 mb-4"
              ></div>

              <div class="flex items-center justify-between">
                <div
                  class="w-1/2 h-4 rounded-full animate-pulse bg-slate-300"
                ></div>

                <div
                  class="mt-2 w-1/6 h-4 rounded-full animate-pulse bg-slate-300"
                ></div>
              </div>

              <div
                class="w-full h-1 rounded-full animate-pulse bg-slate-300 my-2 mt-3"
              ></div>

              <div class="flex items-center justify-between">
                <div
                  class="w-1/2 h-4 rounded-full animate-pulse bg-slate-300"
                ></div>

                <div
                  class="mt-2 w-1/6 h-4 rounded-full animate-pulse bg-slate-300"
                ></div>
              </div>

              <div
                class="w-full h-1 rounded-full animate-pulse bg-slate-300 my-2 mt-3"
              ></div>

              <div class="flex items-center justify-between">
                <div
                  class="w-1/2 h-4 rounded-full animate-pulse bg-slate-300"
                ></div>

                <div
                  class="mt-2 w-1/6 h-4 rounded-full animate-pulse bg-slate-300"
                ></div>
              </div>
            </article>
          </LoadingInfoReport>
        </template>
      </Suspense>

      <article
        ref="aksiTransaksi"
        class="shadow-sharp-lg border-4 border-black grid grid-cols-2 bg-sky-500 p-4 gap-4"
      >
        <h2 class="col-span-2 capitalize text-xl font-semibold text-white">
          lihat laporan transaksi
        </h2>

        <button class="button-primary font-semibold text-xs">
          laporan minggu ini
        </button>

        <button class="button-primary font-semibold text-xs">
          laporan bulan ini
        </button>

        <button class="button-primary font-semibold text-xs col-span-2">
          laporan keseluruhan
        </button>
      </article>
    </section>
  </section>
</template>
