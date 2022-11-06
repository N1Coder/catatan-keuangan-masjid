<script setup>
import Modal from "../Modal.vue"
import { Icon } from "@iconify/vue"
import { computed, ref } from "vue"
import { useRoute } from "vue-router"
import { currency } from "../../utils/currency"
import {
  getDataFromParams,
  dataPemasukan,
  dataPengeluaran,
  dataCategoryPemasukan,
  dataCategoryPengeluaran,
  dataSaldoAwal,
  dataSaldoAkhir,
  saldoAwal,
  saldoAkhir,
} from "../../utils/data/getDataFromParams"
import { daysIndonesian } from "../../utils/time/getDay"
import { monthsIndonesian } from "../../utils/time/getMonth"
import { sortByLatest } from "../../utils/time/sortByLatest"
import { dataNotif, getCategories } from "../../utils/useData"
import { getDataByDate } from "../../utils/data/getDataByDate"
import { deleteData, updateData } from "../../utils/useActions"
import { getMonthDates } from "../../utils/useTime"

const route = useRoute()

const modalStatus = ref(false)

const nameInput = ref(""),
  incomeInput = ref(""),
  dateInput = ref(null),
  categoriesInput = ref(null),
  dataCategories = ref([])

const msg = ref(""),
  id = ref(null)

const totalPemasukan = ref(0),
  totalPengeluaran = ref(0)

const categoryPemasukan = ref([]),
  categoryPengeluaran = ref([])

await getCategories("kategori_pemasukan", categoryPemasukan)
await getCategories("kategori_pengeluaran", categoryPengeluaran)

// get data based on url params
await getDataFromParams(route.params.time)

saldoAwal.value = Number(dataSaldoAwal.value)
saldoAkhir.value = Number(dataSaldoAkhir.value)

// for total section
dataPemasukan.value.map((pemasukan) => {
  totalPemasukan.value += Number(pemasukan.jumlah)
})

dataPengeluaran.value.map((pengeluaran) => {
  totalPengeluaran.value += Number(pengeluaran.jumlah)
})

const sumSaldoAkhir = () => {
  saldoAkhir.value += totalPemasukan.value
  saldoAkhir.value -= totalPengeluaran.value

  return saldoAkhir.value
}
sumSaldoAkhir()

// for category section
const sumCategoryPemasukan = (nameCategory, data) => {
  return data
    .filter((i) => i.kategori_pemasukan.id_kategori === nameCategory)
    .reduce((a, b) => Number(a) + Number(b.jumlah), 0)
}

const sumCategoryPengeluaran = (nameCategory, data) => {
  return data
    .filter((i) => i.kategori_pengeluaran.id_kategori === nameCategory)
    .reduce((a, b) => Number(a) + Number(b.jumlah), 0)
}

const showStatusTime = (params) => {
  if (params === "week") {
    return "minggu ini"
  } else if (params === "month") {
    return "bulan ini"
  } else {
    return "keseluruhan"
  }
}

// for list transactions
const dataTransaksi = ref([...dataPemasukan.value, ...dataPengeluaran.value])

// sort data from latest date
sortByLatest(dataTransaksi.value)

const showStatusTransaksi = () => {
  return dataTransaksi.value.length > 0
    ? `daftar transaksi ${showStatusTime(route.params.time)}`
    : `tidak ada transaksi untuk ${showStatusTime(route.params.time)}`
}

const showDateTransaksi = (date) => {
  const d = new Date(date)

  return `${daysIndonesian[d.getDay()]}, ${d.getDate()} ${
    monthsIndonesian[d.getMonth()]
  } ${d.getFullYear()}`
}

const toggleModal = async (i, idStatus, idTransaction, idCategory) => {
  modalStatus.value = true

  if (i !== undefined) {
    console.log(idCategory, idTransaction)
    const showMsg = () => {
      return idStatus ? (msg.value = "pengeluaran") : (msg.value = "pemasukan")
    }

    const showCategory = () => {
      return idStatus
        ? (dataCategories.value = categoryPengeluaran.value)
        : (dataCategories.value = categoryPemasukan.value)
    }

    showMsg()
    showCategory()

    id.value = idTransaction

    dateInput.value =
      dataTransaksi.value[i].tanggal_pengeluaran ??
      dataTransaksi.value[i].tanggal_pemasukan

    nameInput.value =
      dataTransaksi.value[i].nama_pengeluaran ??
      dataTransaksi.value[i].nama_pemasukan

    incomeInput.value = dataTransaksi.value[i].jumlah

    categoriesInput.value = idCategory
  }
}

const updateDataModal = async () => {
  try {
    await updateData(
      msg.value === "pengeluaran" ? "pengeluaran" : "pemasukan",
      msg.value === "pengeluaran"
        ? {
            kategori_pengeluaran: categoriesInput.value,
            nama_pengeluaran: nameInput.value,
            jumlah: incomeInput.value,
            tanggal_pengeluaran: dateInput.value,
          }
        : {
            kategori_pemasukan: categoriesInput.value,
            nama_pemasukan: nameInput.value,
            jumlah: incomeInput.value,
            tanggal_pemasukan: dateInput.value,
          },
      msg.value === "pengeluaran" ? "id_pengeluaran" : "id_pemasukan",
      id.value
    )

    dataNotif.value.push({
      id: Math.trunc(Math.random() * 100),
      success: true,
      message: "data berhasil diubah",
    })
  } catch (err) {
    console.log(err.message)
    dataNotif.value.push({
      id: Math.trunc(Math.random() * 100),
      success: false,
      message: err.message,
    })
  }
}

const closeModal = () => {
  modalStatus.value = false
}
</script>

<template>
  <article class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <h2
      class="lg:col-span-2 capitalize text-2xl font-bold text-orange-600 mb-6"
    >
      laporan keuangan {{ showStatusTime(route.params.time) }}
    </h2>

    <article
      class="shadow-sharp border-[3px] border-black bg-white p-4 rounded-lg"
    >
      <div
        class="flex items-center justify-between text-lg lg:text-xl font-bold text-slate-500"
      >
        <p class="capitalize">
          jumlah saldo awal {{ showStatusTime(route.params.time) }}
        </p>
        <Icon icon="bi:info-circle-fill" />
      </div>

      <div>
        <p class="mt-2 text-md lg:text-lg font-semibold text-slate-700">
          Rp. {{ currency(saldoAwal) || 0 }},00
        </p>
      </div>
    </article>

    <article
      class="shadow-sharp border-[3px] border-black bg-white p-4 rounded-lg"
    >
      <div
        class="flex items-center justify-between text-lg lg:text-xl font-bold text-slate-500"
      >
        <p class="capitalize">
          jumlah saldo akhir {{ showStatusTime(route.params.time) }}
        </p>
        <Icon icon="bi:info-circle-fill" />
      </div>

      <div>
        <p class="mt-2 text-md lg:text-lg font-semibold text-slate-700">
          Rp.
          {{
            saldoAwal === saldoAkhir ? "-" : `${currency(saldoAkhir)},00` || 0
          }}
        </p>
      </div>
    </article>

    <article
      class="shadow-sharp border-[3px] border-black bg-white p-4 rounded-lg"
    >
      <div
        class="flex items-center justify-between text-lg font-bold text-rose-500"
      >
        <p class="capitalize">
          jumlah pengeluaran {{ showStatusTime(route.params.time) }}
        </p>
        <Icon icon="bi:arrow-up-square-fill" />
      </div>

      <div>
        <p class="mt-2 text-md font-semibold text-rose-700">
          Rp. {{ currency(totalPengeluaran) }},00
        </p>
      </div>
    </article>

    <article
      class="shadow-sharp border-[3px] border-black bg-white p-4 rounded-lg"
    >
      <div
        class="flex items-center justify-between text-lg font-bold text-emerald-500"
      >
        <p class="capitalize">
          jumlah pemasukan {{ showStatusTime(route.params.time) }}
        </p>
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
    class="shadow-sharp-lg border-4 border-black grid grid-cols-1 lg:grid-cols-2 bg-rose-700 mt-10 p-4 gap-4"
  >
    <h2 class="lg:col-span-2 capitalize text-xl font-semibold text-white">
      laporan kategori {{ showStatusTime(route.params.time) }}
    </h2>

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
  </article>

  <article class="relative mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
    <h2 class="capitalize text-orange-600 text-lg font-bold md:col-span-2">
      {{ showStatusTransaksi() }}
    </h2>

    <transition-group name="list">
      <article
        v-for="(transaksi, i) in dataTransaksi"
        :key="transaksi.id_pengeluaran ?? transaksi.id_pemasukan"
        class="relative shadow-sharp border-[3px] border-black bg-white p-4 rounded-lg"
      >
        <p
          :class="
            transaksi.id_pengeluaran ? 'text-rose-600' : 'text-emerald-600'
          "
          class="flex items-center gap-x-1 mb-1 capitalize text-md font-bold"
        >
          <Icon icon="bxs:right-arrow" />
          {{
            transaksi.id_pengeluaran
              ? showDateTransaksi(transaksi.tanggal_pengeluaran)
              : showDateTransaksi(transaksi.tanggal_pemasukan)
          }}
        </p>

        <div class="flex items-center">
          <div
            :class="
              transaksi.id_pengeluaran ? 'text-rose-700' : 'text-emerald-700'
            "
            class="text-md font-semibold"
          >
            <p
              :class="
                transaksi.id_pengeluaran ? 'text-rose-700' : 'text-emerald-700'
              "
              class="capitalize"
            >
              {{
                transaksi.id_pengeluaran
                  ? transaksi.nama_pengeluaran
                  : transaksi.nama_pemasukan
              }}
            </p>
            Rp. {{ currency(transaksi.jumlah) }},00
          </div>

          <button
            @click="
              toggleModal(
                i,
                transaksi.id_pengeluaran,
                transaksi.id_pengeluaran ?? transaksi.id_pemasukan,
                transaksi.kategori_pengeluaran ?? transaksi.kategori_pemasukan
              )
            "
            class="button-action-edit"
          >
            <Icon icon="fluent:document-edit-24-filled" />
          </button>

          <button
            @click="
              deleteData(
                transaksi.id_pengeluaran ? 'pengeluaran' : 'pemasukan',
                transaksi.id_pengeluaran ? 'id_pengeluaran' : 'id_pemasukan',
                transaksi.id_pengeluaran ?? transaksi.id_pemasukan,
                dataTransaksi,
                i
              )
            "
            class="button-action-delete"
          >
            <Icon icon="fluent:delete-24-filled" />
          </button>
        </div>
      </article>
    </transition-group>
  </article>

  <Transition name="modal">
    <Modal @close="closeModal" v-if="modalStatus">
      <div class="p-8 px-6 lg:max-w-md lg:mx-auto">
        <button
          @click="closeModal"
          class="button-action-delete block w-fit ml-auto"
        >
          <Icon class="text-white text-2xl" icon="clarity:window-close-line" />
        </button>

        <form
          @submit.prevent="updateDataModal"
          class="flex flex-col gap-4 mt-3 py-9 p-7 bg-white shadow-sharp border-[3px] border-black"
        >
          <label>
            <p class="capitalize text-lg text-orange-500 font-medium">
              tanggal {{ msg }}
            </p>
            <input
              v-model="dateInput"
              class="input-primary"
              type="date"
              required
            />
          </label>

          <label>
            <p class="capitalize text-lg text-orange-500 font-medium">
              kategori {{ msg }}
            </p>

            <select v-model="categoriesInput" class="input-primary py-1">
              <option
                v-for="(category, i) in dataCategories"
                :key="i"
                :value="category.id_kategori"
              >
                {{ category.nama_kategori }}
              </option>
            </select>
          </label>

          <label>
            <p class="capitalize text-lg text-orange-500 font-medium">
              nama {{ msg }}
            </p>
            <input
              v-model="nameInput"
              class="input-primary"
              type="text"
              minlength="3"
              :placeholder="`Ubah nama ${msg}`"
              required
            />
          </label>

          <label>
            <p class="capitalize text-lg text-orange-500 font-medium">
              jumlah {{ msg }}
            </p>
            <input
              v-model="incomeInput"
              class="input-primary"
              type="number"
              min="100"
              :placeholder="`Masukkan jumlah ${msg}`"
              required
            />

            <p class="capitalize text-lg text-orange-500 font-medium">
              Rp. {{ currency(incomeInput) || "0" }},00
            </p>
          </label>

          <input
            class="button-primary"
            type="submit"
            value="Simpan perubahan"
          />
        </form>
      </div>
    </Modal>
  </Transition>
</template>
