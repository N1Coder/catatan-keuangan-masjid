<script setup>
import { ref } from 'vue';
import { currency } from '../utils/currency';
import { getDataToday } from '../utils/useData';

const totalPemasukan = ref(null),
  totalPengeluaran = ref(null)

const infoPemasukanHariIni = ref([]),
      infoPengeluaranHariIni = ref([])

await getDataToday(
  "pemasukan",
  "*",
  "tanggal_pemasukan",
  infoPemasukanHariIni
)
await getDataToday(
  "pengeluaran",
  "*",
  "tanggal_pengeluaran",
  infoPengeluaranHariIni
)
</script>

<template>
    <article class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <h2 class="capitalize text-orange-600 text-lg font-bold md:col-span-2">
        daftar transaksi hari ini
      </h2>

      <article v-for="pengeluaran in infoPengeluaranHariIni" :key="pengeluaran.id_pengeluaran" class="shadow-sharp border-[3px] border-black bg-white p-4 rounded-lg">
      <div>
        <p class="text-md font-semibold text-rose-700" >
            <p class="capitalize text-rose-500">
              {{ pengeluaran.nama_pengeluaran }}
            </p>
            Rp. {{ currency(pengeluaran.jumlah_pengeluaran) }},00
          </p>
        </div>
      </article>

      <article v-for="pemasukan in infoPemasukanHariIni" :key="pemasukan.id_pemasukan" class="shadow-sharp border-[3px] border-black bg-white p-4 rounded-lg">
      <div>
        <p class="text-md font-semibold text-emerald-700" >
            <p class="capitalize text-emerald-500">
              {{ pemasukan.nama_pemasukan }}
            </p>
            Rp. {{ currency(pemasukan.jumlah_pemasukan) }},00
          </p>
        </div>
      </article>

    </article>
</template>