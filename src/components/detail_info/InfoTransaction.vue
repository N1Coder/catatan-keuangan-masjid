<script setup>
import { Icon } from "@iconify/vue"
import { onMounted, ref } from "vue"
import { currency } from "../../utils/currency"
import { getSaldo } from "../../utils/data/getDataSaldo"
import { dateForQuery, dateYesterday } from "../../utils/time/handleDate"
import { upsertData } from "../../utils/useActions"
import { getDataToday } from "../../utils/useData"
import {
  dataPemasukanHariIni,
  dataPengeluaranHariIni,
} from "../../utils/useData"

const totalPemasukan = ref(0),
  totalPengeluaran = ref(0),
  saldoAwalHariIni = ref(0),
  saldoAkhirHariIni = ref(0)

const dataSaldoAwal = ref([]),
  dataSaldoAkhir = ref([])

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

saldoAwalHariIni.value = Number(dataSaldoAwal.value)
saldoAkhirHariIni.value = Number(dataSaldoAkhir.value)
console.log(saldoAkhirHariIni.value)

dataPemasukanHariIni.value.map((pemasukan) => {
  totalPemasukan.value += Number(pemasukan.jumlah)
})

dataPengeluaranHariIni.value.map((pengeluaran) => {
  totalPengeluaran.value += Number(pengeluaran.jumlah)
})

const sumSaldoAkhir = () => {
  saldoAkhirHariIni.value += totalPemasukan.value
  saldoAkhirHariIni.value -= totalPengeluaran.value

  return saldoAkhirHariIni.value
}
sumSaldoAkhir()

onMounted(() => {
  upsertData("saldo", {
    jenis_saldo: 3,
    jumlah_saldo: saldoAkhirHariIni.value,
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
            saldoAwalHariIni === saldoAkhirHariIni
              ? "-"
              : `${currency(saldoAkhirHariIni)},00` || 0
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
