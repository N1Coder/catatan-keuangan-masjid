<script setup>
import { ref } from 'vue'
import { currency } from '../../utils/currency'
import { getDataToday } from '../../utils/useData'
import { sortHighToLow } from "../../utils/sortHighToLow"

const dataPemasukanHariIni = ref([]),
      dataPengeluaranHariIni = ref([])

await getDataToday(
  "pemasukan",
  "*",
  "tanggal_pemasukan",
  dataPemasukanHariIni
)
await getDataToday(
  "pengeluaran",
  "*",
  "tanggal_pengeluaran",
  dataPengeluaranHariIni
)

const dataTransaksiHariIni = ref([...dataPemasukanHariIni.value, ...dataPengeluaranHariIni.value])

const showStatusTransaksi = () => {
  return dataTransaksiHariIni.value.length > 0 ? 'daftar transaksi hari ini' : 'tidak ada transaksi untuk hari ini'
}

sortHighToLow(dataTransaksiHariIni.value)

</script>

<template>
    <article class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <h2 class="capitalize text-orange-600 text-lg font-bold md:col-span-2">
        {{ showStatusTransaksi() }}
      </h2>

      <article v-for="(transaksiHariIni, i) in dataTransaksiHariIni" :key="i" class="shadow-sharp border-[3px] border-black bg-white p-4 rounded-lg">
      <div>
        <p class="text-md font-semibold" :class="transaksiHariIni.id_pengeluaran ? 'text-rose-700' : 'text-emerald-700'" >
            <p class="capitalize" :class="transaksiHariIni.id_pengeluaran ? 'text-rose-700' : 'text-emerald-700'">
              {{ transaksiHariIni.id_pengeluaran ? transaksiHariIni.nama_pengeluaran : transaksiHariIni.nama_pemasukan }}
            </p>
            Rp. {{ currency(transaksiHariIni.jumlah) }},00
          </p>
        </div>
      </article>

    </article>
</template>