<script setup>
import { Icon } from "@iconify/vue"
import gsap from "gsap"
import { onMounted, ref } from "vue"

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

onMounted(() => {
  gsap.fromTo(
    totalTransaksi.value,
    {
      opacity: 0,
      y: 25,
    },
    {
      opacity: 1,
      y: 0,
      delay: 0.25,
    }
  )
  gsap.fromTo(
    jenisKategori.value,
    {
      opacity: 0,
      y: 25,
    },
    {
      opacity: 1,
      y: 0,
      delay: 0.5,
    }
  )
  gsap.fromTo(
    aksiTransaksi.value,
    {
      opacity: 0,
      y: 25,
    },
    {
      opacity: 1,
      y: 0,
      delay: 0.75,
    }
  )
})
</script>

<template>
  <section>
    <header>
      <h1 class="capitalize text-2xl font-bold text-orange-600 mb-6">
        laporan keuangan
      </h1>
    </header>

    <section class="grid grid-cols-1 gap-y-12">
      <article
        ref="totalTransaksi"
        class="shadow-sharp-lg border-4 border-black grid grid-cols-1 bg-red-500 p-4 gap-4"
      >
        <h2 class="capitalize text-xl font-semibold text-white">
          total transaksi
        </h2>

        <article ref="pengeluaran" class="bg-white p-4 rounded-lg">
          <div
            class="flex items-center justify-between text-md text-rose-500 font-bold"
          >
            <p class="capitalize">pengeluaran</p>
            <Icon icon="bi:arrow-up-square-fill" />
          </div>
          <div>
            <p class="mt-2 text-base text-rose-700 font-semibold">
              Rp. 100.000,00
            </p>
          </div>
        </article>

        <article ref="pemasukan" class="bg-white p-4 rounded-lg">
          <div
            class="flex items-center justify-between text-md text-emerald-500 font-bold"
          >
            <p class="capitalize">pemasukan</p>
            <Icon icon="bi:arrow-down-square-fill" />
          </div>
          <div>
            <p class="mt-2 text-base text-emerald-700 font-semibold">
              Rp. 350.000,00
            </p>
          </div>
        </article>
      </article>

      <article
        ref="jenisKategori"
        class="shadow-sharp-lg border-4 border-black grid grid-cols-1 bg-amber-400 p-4 gap-4"
      >
        <h2 class="capitalize text-xl font-semibold text-white">
          jenis kategori
        </h2>

        <article ref="pengeluaran" class="bg-white p-4 rounded-lg">
          <h2 class="capitalize text-md font-semibold mb-1">
            top kategori pengeluaran
          </h2>

          <div
            class="flex items-center justify-between text-lg text-rose-500 font-bold"
          >
            <p class="capitalize text-sm">tagihan</p>

            <p class="mt-2 text-sm text-rose-700 font-semibold">
              Rp. 100.000,00
            </p>
          </div>

          <hr class="border border-slate-200 rounded-full mt-1" />

          <div
            class="flex items-center justify-between text-lg text-rose-500 font-bold"
          >
            <p class="capitalize text-sm">biaya operasional</p>

            <p class="mt-2 text-sm text-rose-700 font-semibold">
              Rp. 600.000,00
            </p>
          </div>

          <hr class="border border-slate-200 rounded-full mt-1" />

          <div
            class="flex items-center justify-between text-lg text-rose-500 font-bold"
          >
            <p class="capitalize text-sm">lain-lain</p>

            <p class="mt-2 text-sm text-rose-700 font-semibold">
              Rp. 1.100.000,00
            </p>
          </div>
        </article>

        <article ref="pemasukan" class="bg-white p-4 rounded-lg">
          <h2 class="capitalize text-md font-semibold mb-1">
            top kategori pemasukan
          </h2>

          <div
            class="flex items-center justify-between text-lg text-emerald-500 font-bold"
          >
            <p class="capitalize text-sm">uang kas</p>

            <p class="mt-2 text-sm text-emerald-700 font-semibold">
              Rp. 100.000,00
            </p>
          </div>

          <hr class="border border-slate-200 rounded-full mt-1" />

          <div
            class="flex items-center justify-between text-lg text-emerald-500 font-bold"
          >
            <p class="capitalize text-sm">hasil selamatan</p>

            <p class="mt-2 text-sm text-emerald-700 font-semibold">
              Rp. 550.000,00
            </p>
          </div>
        </article>
      </article>

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
