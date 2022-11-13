<script setup>
import { parseISO, previousFriday } from "date-fns"
import { ref } from "vue"
import { currency } from "../../utils/currency"
import { dataPemasukan } from "../../utils/data/getDataFromParams"
import { monthsIndonesian } from "../../utils/time/getMonth"
import { dateToday, getWeekDates } from "../../utils/useTime"

const [startWeek, endWeek] = getWeekDates()

const props = defineProps([
  "dataPemasukan",
  "dataPengeluaran",
  "saldoAwal",
  "saldoAkhir",
])

const dataBiayaRutin = ref(
  props.dataPengeluaran.filter((data) => data.kategori_pengeluaran === 1)
)

const dataLainnya = ref(
  props.dataPengeluaran.filter((data) => data.kategori_pengeluaran !== 1)
)

const sumPemasukan =
  props.dataPemasukan.reduce((a, b) => Number(a) + Number(b.jumlah), 0) +
  Number(props.saldoAwal)

const sumDataBiayaRutin = props.dataPengeluaran
  .filter((data) => data.kategori_pengeluaran === 1)
  .reduce((a, b) => Number(a) + Number(b.jumlah), 0)

const sumDataLainnya = props.dataPengeluaran
  .filter((data) => data.kategori_pengeluaran !== 1)
  .reduce((a, b) => Number(a) + Number(b.jumlah), 0)

const lastDayOfWeek = previousFriday(parseISO(startWeek))
const formattedLastDateWeek = `${lastDayOfWeek.getDate()} ${
  monthsIndonesian[lastDayOfWeek.getMonth()]
} ${lastDayOfWeek.getFullYear()}`
</script>

<template>
  <h1 class="uppercase text-lg font-semibold text-center leading-tight">
    dewan kemakmuran masjid (dkm) <br />

    <span class="block font-bold text-4xl"> al-fadhilah </span>

    <span class="block px-8">
      kelurahan karang mumus kecamatan samarinda kota kalimantan timur
    </span>

    <span class="capitalize">
      jl. muso salim gang 6/7 samarinda <span class="font-bold"> (75113) </span>
    </span>
  </h1>

  <table class="table-auto w-full border-collapse border border-black">
    <thead>
      <tr>
        <th class="font-semibold uppercase border border-black w-[5%]">no</th>
        <th class="font-semibold uppercase border border-black w-[45%]">
          uraian
        </th>
        <th class="font-semibold uppercase border border-black w-[25%]">
          pemasukan
        </th>
        <th class="font-semibold uppercase border border-black w-[25%]">
          saldo kas
        </th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td class="border border-black text-center">1</td>
        <td class="first-letter:capitalize border border-black pl-2">
          {{ `saldo kas Jum\'at lalu tgl ${formattedLastDateWeek}` }}
        </td>
        <td class="border border-black pl-2">Rp. {{ currency(saldoAwal) }}</td>
        <td></td>
      </tr>
      <tr v-for="(pemasukan, i) in dataPemasukan">
        <td class="border border-black text-center">
          {{ i + 2 }}
        </td>
        <td class="first-letter:capitalize border border-black pl-2">
          {{ pemasukan.nama_pemasukan }}
        </td>
        <td class="border border-black pl-2">
          Rp. {{ currency(pemasukan.jumlah) }}
        </td>
        <td></td>
      </tr>
      <tr>
        <td class="border border-black"></td>
        <td class="first-letter:capitalize border border-black text-center">
          jumlah
        </td>
        <td class="border border-black text-center">-</td>
        <td class="border border-black text-center">
          Rp. {{ currency(sumPemasukan) }}
        </td>
      </tr>
    </tbody>
  </table>

  <table class="w-full border-collapse border border-black">
    <thead>
      <tr>
        <th class="font-semibold uppercase border border-black w-[5%]">no</th>
        <th class="font-semibold uppercase border border-black w-[45%]">
          biaya rutin
        </th>
        <th class="font-semibold uppercase border border-black w-[25%]">
          pengeluaran
        </th>
        <th class="font-semibold uppercase border border-black w-[25%]"></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(biayaRutin, i) in dataBiayaRutin">
        <td class="border border-black text-center">
          {{ i + 1 }}
        </td>
        <td class="first-letter:capitalize border border-black pl-2">
          {{ biayaRutin.nama_pengeluaran }}
        </td>
        <td class="border border-black pl-2">
          Rp. {{ currency(biayaRutin.jumlah) }}
        </td>
        <td></td>
      </tr>
      <tr>
        <td class="border border-black"></td>
        <td class="first-letter:capitalize border border-black text-center">
          jumlah
        </td>
        <td class="border border-black text-center">-</td>
        <td class="border border-black text-center">
          Rp. {{ currency(sumDataBiayaRutin) }}
        </td>
      </tr>
    </tbody>
  </table>

  <table class="w-full border-collapse border border-black">
    <thead>
      <tr>
        <th class="font-semibold uppercase border border-black w-[5%]">no</th>
        <th class="font-semibold uppercase border border-black w-[45%]">
          biaya operasional dan lainnya
        </th>
        <th class="font-semibold uppercase border border-black w-[25%]">
          pengeluaran
        </th>
        <th class="font-semibold uppercase border border-black w-[25%]"></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(biayaLainnya, i) in dataLainnya">
        <td class="border border-black text-center">
          {{ i + 1 }}
        </td>
        <td class="first-letter:capitalize border border-black pl-2">
          {{ biayaLainnya.nama_pengeluaran }}
        </td>
        <td class="border border-black pl-2">
          Rp. {{ currency(biayaLainnya.jumlah) }}
        </td>
        <td></td>
      </tr>
      <tr>
        <td class="border border-black"></td>
        <td class="first-letter:capitalize border border-black text-center">
          jumlah
        </td>
        <td class="border border-black text-center">-</td>
        <td class="border border-black text-center">
          Rp. {{ currency(sumDataLainnya) }}
        </td>
      </tr>
      <tr>
        <td class="border border-black"></td>
        <td class="first-letter:capitalize border border-black text-center">
          total jumlah kas masjid
        </td>
        <td class="border border-black text-center">-</td>
        <td class="border border-black text-center">
          Rp. {{ currency(saldoAkhir) }}
        </td>
      </tr>
    </tbody>
  </table>

  <div class="ml-auto -mt-2">Samarinda, {{ dateToday }}</div>

  <div class="flex justify-around mt-4">
    <div class="text-center">
      <div class="first-letter:capitalize">mengetahui</div>
      <div class="uppercase underline font-semibold mt-20">m. nico arifin</div>
      <div class="first-letter:capitalize">ketua</div>
    </div>

    <div class="text-center">
      <div class="first-letter:capitalize invisible">diketahui</div>
      <div class="uppercase underline font-semibold mt-20">muhamad nico, a</div>
      <div class="first-letter:capitalize">bendahara</div>
    </div>
  </div>
</template>
