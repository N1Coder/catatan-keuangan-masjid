<script setup>
import { Icon } from "@iconify/vue"
import { computed, onMounted, ref } from "vue"
import { currency } from "../../utils/currency"
import { saldoAkhir } from "../../utils/data/getDataFromParams"
import { getSaldoYesterday } from "../../utils/data/getDataYesterday"
import { dateForQuery } from "../../utils/time/handleDate"
import { upsertData } from "../../utils/useActions"
import { getAllData, getDataToday } from "../../utils/useData"
import {
  dataPemasukanHariIni,
  dataPengeluaranHariIni,
} from "../../utils/useData"

const totalPemasukan = ref(0),
  totalPengeluaran = ref(0),
  jumlahSemuaPemasukan = ref(0),
  jumlahSemuaPengeluaran = ref(0),
  saldoAwalHariIni = ref(0),
  saldoAkhirHariIni = ref(0)

const dataSemuaPemasukan = ref([]),
  dataSemuaPengeluaran = ref([]),
  dataSaldo = ref([])

await getAllData("pemasukan", dataSemuaPemasukan)
await getAllData("pengeluaran", dataSemuaPengeluaran)

dataSemuaPemasukan.value.map((pemasukan) => {
  jumlahSemuaPemasukan.value += Number(pemasukan.jumlah)
})

dataSemuaPengeluaran.value.map((pengeluaran) => {
  jumlahSemuaPengeluaran.value += Number(pengeluaran.jumlah)
})

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

await getSaldoYesterday("saldo", "jumlah_saldo", "waktu", dataSaldo)

const checkSaldo = async () => {
  const dataSaldo = ref([]),
    dataSaldoAwal = ref([])

  const saldoKemarin = await getSaldoYesterday(
    "saldo",
    "jumlah_saldo",
    "waktu",
    dataSaldoAwal
  )
  const saldoHariIni = await getDataToday(
    "saldo",
    "jumlah_saldo",
    "waktu",
    dataSaldo
  )

  if (dataSaldo.value.length === 0) {
    return await upsertData("saldo", {
      jenis_saldo: 1,
      jumlah_saldo: "2500000",
      waktu: dateForQuery,
    })
  } else {
    return
  }
}

onMounted(() => {
  checkSaldo()
})

saldoAwalHariIni.value = Number(dataSaldo.value)
saldoAkhirHariIni.value = Number(dataSaldo.value)

dataPemasukanHariIni.value.map((pemasukan) => {
  totalPemasukan.value += Number(pemasukan.jumlah)
})

dataPengeluaranHariIni.value.map((pengeluaran) => {
  totalPengeluaran.value += Number(pengeluaran.jumlah)
})

saldoAkhirHariIni.value -= totalPengeluaran.value
saldoAkhirHariIni.value += totalPemasukan.value
</script>

<template>
  <article class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
    <article
      class="shadow-sharp border-[3px] border-black bg-white p-4 rounded-lg"
    >
      <div
        class="flex items-center justify-between text-lg lg:text-xl font-bold text-slate-500"
      >
        <p class="capitalize">jumlah saldo awal saat ini</p>
        <Icon icon="bi:info-circle-fill" />
      </div>

      <div>
        <p class="mt-2 text-md lg:text-lg font-semibold text-slate-700">
          Rp. {{ currency(saldoAwalHariIni) || 0 }},00
        </p>
      </div>
    </article>

    <article
      class="shadow-sharp border-[3px] border-black bg-white p-4 rounded-lg"
    >
      <div
        class="flex items-center justify-between text-lg lg:text-xl font-bold text-slate-500"
      >
        <p class="capitalize">jumlah saldo akhir saat ini</p>
        <Icon icon="bi:info-circle-fill" />
      </div>

      <div>
        <p class="mt-2 text-md lg:text-lg font-semibold text-slate-700">
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
      class="shadow-sharp border-[3px] border-black bg-white p-4 rounded-lg"
    >
      <div
        class="flex items-center justify-between text-lg lg:text-xl font-bold text-rose-500"
      >
        <p class="capitalize">jumlah pengeluaran hari ini</p>
        <Icon icon="bi:arrow-up-square-fill" />
      </div>

      <div>
        <p class="mt-2 text-md lg:text-lg font-semibold text-rose-700">
          Rp. {{ currency(totalPengeluaran) }},00
        </p>
      </div>
    </article>

    <article
      class="shadow-sharp border-[3px] border-black bg-white p-4 rounded-lg"
    >
      <div
        class="flex items-center justify-between text-lg lg:text-xl font-bold text-emerald-500"
      >
        <p class="capitalize">jumlah pemasukan hari ini</p>
        <Icon icon="bi:arrow-down-square-fill" />
      </div>

      <div>
        <p class="mt-2 text-md lg:text-lg font-semibold text-emerald-700">
          Rp. {{ currency(totalPemasukan) }},00
        </p>
      </div>
    </article>
  </article>
</template>
