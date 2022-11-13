<script setup>
import { Icon } from "@iconify/vue"
import { onMounted, ref } from "vue"
import { currency } from "../../utils/currency"
import { getFirstSaldo, getSaldo } from "../../utils/data/getDataSaldo"
import { dateForQuery, dateYesterday } from "../../utils/time/handleDate"
import { upsertData } from "../../utils/useActions"
import { getAllData, getDataToday } from "../../utils/useData"
import {
  dataPemasukanHariIni,
  dataPengeluaranHariIni,
} from "../../utils/useData"

const totalPemasukan = ref(0),
  totalPengeluaran = ref(0),
  totalPemasukanSemua = ref(0),
  totalPengeluaranSemua = ref(0),
  saldoAwalHariIni = ref(0),
  saldoAkhirHariIni = ref(0),
  saldoAwalKeseluruhan = ref(0),
  saldoAkhirKeseluruhan = ref(0)

const dataPemasukanSemua = ref([]),
  dataPengeluaranSemua = ref([])

const dataSaldoAwalKeseluruhan = ref([]),
  dataSaldoAkhirKeseluruhan = ref([])

const dataSaldoAwal = ref([]),
  dataSaldoAkhir = ref([])

await getFirstSaldo("saldo", "jumlah_saldo", dataSaldoAwalKeseluruhan)
await getFirstSaldo("saldo", "jumlah_saldo", dataSaldoAkhirKeseluruhan)

await getAllData("pemasukan", dataPemasukanSemua)
await getAllData("pengeluaran", dataPengeluaranSemua)

await getDataToday(
  "pemasukan",
  "jumlah",
  "tanggal_pemasukan",
  dataPemasukanHariIni
)
await getDataToday(
  "pengeluaran",
  "jumlah",
  "tanggal_pengeluaran",
  dataPengeluaranHariIni
)

await getSaldo("saldo", "jumlah_saldo", "waktu", dataSaldoAwal, dateYesterday)
await getSaldo("saldo", "jumlah_saldo", "waktu", dataSaldoAkhir, dateYesterday)

saldoAwalKeseluruhan.value = Number(dataSaldoAwalKeseluruhan.value)
saldoAkhirKeseluruhan.value = Number(dataSaldoAkhirKeseluruhan.value)

saldoAwalHariIni.value = Number(dataSaldoAwal.value)
saldoAkhirHariIni.value = Number(dataSaldoAkhir.value)

dataPemasukanSemua.value.map((pemasukan) => {
  totalPemasukanSemua.value += Number(pemasukan.jumlah)
})

dataPengeluaranSemua.value.map((pengeluaran) => {
  totalPengeluaranSemua.value += Number(pengeluaran.jumlah)
})

dataPemasukanHariIni.value.map((pemasukan) => {
  totalPemasukan.value += Number(pemasukan.jumlah)
})

dataPengeluaranHariIni.value.map((pengeluaran) => {
  totalPengeluaran.value += Number(pengeluaran.jumlah)
})

const sumSaldoAkhir = () => {
  saldoAkhirKeseluruhan.value += totalPemasukanSemua.value
  saldoAkhirKeseluruhan.value -= totalPengeluaranSemua.value

  return saldoAkhirKeseluruhan.value
}
sumSaldoAkhir()

onMounted(() => {
  upsertData("saldo", {
    jumlah_saldo: saldoAkhirKeseluruhan.value,
    waktu: dateForQuery,
  })
})
</script>

<template>
  <article class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
    <article
      class="shadow-sharp border-[3px] border-black bg-white dark:bg-slate-800 p-4 rounded-lg"
    >
      <div
        class="flex items-center justify-between text-lg lg:text-xl font-bold text-slate-500 dark:text-slate-200"
      >
        <p class="capitalize">jumlah saldo awal hari ini</p>
        <Icon icon="bi:info-circle-fill" />
      </div>

      <div>
        <p
          class="mt-2 text-md lg:text-lg font-semibold text-slate-700 dark:text-slate-200"
        >
          Rp. {{ currency(saldoAwalHariIni) || 0 }},00
        </p>
      </div>
    </article>

    <article
      class="shadow-sharp border-[3px] border-black bg-white dark:bg-slate-800 p-4 rounded-lg"
    >
      <div
        class="flex items-center justify-between text-lg lg:text-xl font-bold text-slate-500 dark:text-slate-200"
      >
        <p class="capitalize">jumlah saldo akhir hari ini</p>
        <Icon icon="bi:info-circle-fill" />
      </div>

      <div>
        <p
          class="mt-2 text-md lg:text-lg font-semibold text-slate-700 dark:text-slate-200"
        >
          Rp.
          {{
            saldoAwalHariIni === saldoAkhirKeseluruhan
              ? "-"
              : `${currency(saldoAkhirKeseluruhan)},00` || 0
          }}
        </p>
      </div>
    </article>

    <article
      class="shadow-sharp border-[3px] border-black bg-white dark:bg-slate-800 p-4 rounded-lg"
    >
      <div
        class="flex items-center justify-between text-lg lg:text-xl font-bold text-rose-500 dark:text-rose-500"
      >
        <p class="capitalize">jumlah pengeluaran hari ini</p>
        <Icon icon="bi:arrow-up-square-fill" />
      </div>

      <div>
        <p
          class="mt-2 text-md lg:text-lg font-semibold text-rose-700 dark:text-rose-500"
        >
          Rp. {{ currency(totalPengeluaran) }},00
        </p>
      </div>
    </article>

    <article
      class="shadow-sharp border-[3px] border-black bg-white dark:bg-slate-800 p-4 rounded-lg"
    >
      <div
        class="flex items-center justify-between text-lg lg:text-xl font-bold text-emerald-500 dark:text-emerald-500"
      >
        <p class="capitalize">jumlah pemasukan hari ini</p>
        <Icon icon="bi:arrow-down-square-fill" />
      </div>

      <div>
        <p
          class="mt-2 text-md lg:text-lg font-semibold text-emerald-700 dark:text-emerald-500"
        >
          Rp. {{ currency(totalPemasukan) }},00
        </p>
      </div>
    </article>
  </article>
</template>
