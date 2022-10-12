<script setup>
import { dateToday } from "../utils/useTime"
import { Icon } from "@iconify/vue"
import { ref, onMounted } from "vue"
import gsap from "gsap"
import { currency } from "../utils/currency";

const anggaran = ref(null),
  pemasukan = ref(null),
  pengeluaran = ref(null),
  tambahTransaksi = ref(null)

const listTransaksi = ref([
  {
    namaTransaksi: "Uang Kas Jum'at",
    nominalTransaksi: "517000",
    jenisTransaksi: "pemasukan"
  },
  {
    namaTransaksi: "Bayar Listrik",
    nominalTransaksi: "355000",
    jenisTransaksi: "pengeluaran"
  },
  {
    namaTransaksi: "Biaya Operasional",
    nominalTransaksi: "120000",
    jenisTransaksi: "pengeluaran"
  },

])

const infoTotalTransaksi = ref([
  {
    name: "anggaran",
    description: "jumlah anggaran saat ini",
    totalAnggaran: "6250000",
    icon: "bi:info-circle-fill",
    style: {
      colorHeading: "text-slate-500",
      colorCurrency: "text-slate-700"
    },
  },
  {
    name: "pengeluaran",
    description: "jumlah pengeluaran hari ini",
    totalAnggaran: "127000",
    icon: "bi:arrow-up-square-fill",
    style: {
      colorHeading: "text-rose-500",
      colorCurrency: "text-rose-700"
    },
  },
  {
    name: "pemasukan",
    description: "jumlah pemasukan hari ini",
    totalAnggaran: "224000",
    icon: "bi:arrow-down-square-fill",
    style: {
      colorHeading: "text-emerald-500",
      colorCurrency: "text-emerald-700"
    },
  },
])

onMounted(() => {
  gsap.fromTo(
    anggaran.value,
    {
      ease: "power2.InOut",
      opacity: 0,
      y: 20,
      duration: 1,
    },
    {
      opacity: 1,
      y: 0,
    }
  )
  gsap.fromTo(
    pengeluaran.value,
    {
      ease: "power2.InOut",
      opacity: 0,
      y: 20,
      duration: 1,
    },
    {
      delay: 0.5,
      opacity: 1,
      y: 0,
    }
  )
  gsap.fromTo(
    pemasukan.value,
    {
      ease: "power2.InOut",
      opacity: 0,
      y: 20,
      duration: 1,
    },
    {
      delay: 0.75,
      opacity: 1,
      y: 0,
    }
  )
  gsap.fromTo(
    tambahTransaksi.value,
    {
      ease: "power2.InOut",
      opacity: 0,
      x: 20,
      duration: 1,
    },
    {
      delay: 1,
      opacity: 1,
      x: 0,
    }
  )
})
</script>

<template>
  <section>
    <header>
      <h1 class="capitalize text-xl md:text-2xl text-orange-600 font-bold">
        overview keuangan masjid Al-Fadhilah
      </h1>
      <p class="text-md md:text-lg text-orange-500 font-semibold">
        Hari ini, {{ dateToday }}
      </p>
    </header>

    <article class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <article
        v-for="(transaksi, i) in infoTotalTransaksi"
        :key="i"
        class="shadow-sharp border-[3px] border-black bg-white p-4 md:col-span-2 rounded-lg"
        :ref="transaksi.name"
      >
        <div
          class="flex items-center justify-between text-lg font-bold"
          :class="transaksi.style.colorHeading"
        >
          <p class="capitalize">
            {{ transaksi.description }}
          </p>
          <Icon :icon="transaksi.icon" />
        </div>
        <div>
          <p class="mt-2 text-md font-semibold" :class="transaksi.style.colorCurrency">
            Rp. {{ currency(transaksi.totalAnggaran) }},00
          </p>
        </div>
      </article>
    </article>

    <RouterLink
      ref="tambahTransaksi"
      class="shadow-sharp transition-all inline-block mt-6 capitalize py-1 px-4 bg-orange-400 border-2 border-slate-900 text-slate-900 font-medium hover:bg-orange-500 hover:shadow-none"
      to="/tambah-transaksi"
    >
      tambah transaksi
    </RouterLink>

    <article class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <h2 class="capitalize text-orange-600 text-lg font-bold md:col-span-2">
        daftar transaksi hari ini
      </h2>

      <article v-for="(transaksi, i) in listTransaksi" :key="i" class="shadow-sharp border-[3px] border-black bg-white p-4 rounded-lg">
      <div>
        <p class="text-md font-semibold" :class="transaksi.jenisTransaksi === 'pengeluaran' ? 'text-rose-700' : 'text-emerald-700'">
            <p class="capitalize" :class="transaksi.jenisTransaksi === 'pengeluaran' ? 'text-rose-500' : 'text-emerald-500'">{{ transaksi.namaTransaksi }}</p>
            Rp. {{ currency(transaksi.nominalTransaksi) }},00
          </p>
        </div>
      </article>

    </article>

  </section>
</template>
