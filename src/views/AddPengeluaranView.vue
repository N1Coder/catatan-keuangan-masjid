<script setup>
import { Icon } from "@iconify/vue"
import { onMounted, ref } from "vue"
import { currency } from "../utils/currency"
import { insertData } from "../utils/useActions"
import { getCategories } from "../utils/useData"

const categoriesPengeluaran = ref([])

const nameInput = ref(""),
  incomeInput = ref(""),
  dateInput = ref(""),
  categoriesInput = ref(null)

onMounted(() => {
  getCategories("kategori_pengeluaran", categoriesPengeluaran)
})

const addPengeluaran = async () => {
  if (incomeInput.value === 0) {
    return alert("Tolong isi jumlah transaksi")
  }

  try {
    const newPengeluaran = await insertData("pengeluaran", {
      kategori_pengeluaran: categoriesInput.value,
      nama_pengeluaran: nameInput.value,
      jumlah_pengeluaran: incomeInput.value,
      tanggal_pengeluaran: dateInput.value,
    })

    if (!newPengeluaran) {
      return
    }

    nameInput.value = ""
    incomeInput.value = ""
    dateInput.value = ""
  } catch (err) {
    console.log("There was an error", err)
  }
}
</script>

<template>
  <section>
    <h1 class="capitalize text-3xl text-orange-500 font-bold">
      tambah pengeluaran
    </h1>

    <form
      class="flex flex-col gap-4 mt-6 py-9 p-7 bg-white shadow-sharp-lg border-[3px] border-black"
      @submit.prevent="addPengeluaran"
    >
      <label>
        <p class="capitalize text-lg text-orange-500 font-medium">
          tanggal pengeluaran
        </p>
        <input class="input-primary" v-model="dateInput" type="date" required />
      </label>

      <label>
        <p class="capitalize text-lg text-orange-500 font-medium">
          kategori pengeluaran
        </p>
        <select class="input-primary py-1" v-model="categoriesInput">
          <option
            v-for="(category, i) in categoriesPengeluaran"
            :key="i"
            :value="category.id_kategori"
          >
            {{ category.nama_kategori }}
          </option>
        </select>
      </label>

      <label>
        <p class="capitalize text-lg text-orange-500 font-medium">
          nama pengeluaran
        </p>
        <input
          class="input-primary"
          v-model="nameInput"
          type="text"
          placeholder="Masukkan nama pemasukan / pengeluaran"
          required
        />
      </label>

      <label>
        <p class="capitalize text-lg text-orange-500 font-medium">
          jumlah pengeluaran
        </p>
        <input
          class="input-primary"
          v-model="incomeInput"
          type="number"
          min="100"
          placeholder="Masukkan jumlah pemasukan / pengeluaran"
          required
        />

        <p class="capitalize text-lg text-orange-500 font-medium">
          Rp. {{ currency(incomeInput) || "0" }},00
        </p>
      </label>

      <input class="button-primary" type="submit" value="Tambah" />
    </form>

    <RouterLink
      class="flex items-center w-fit mt-8 button-primary"
      :to="{ name: 'transactions' }"
    >
      <Icon icon="ic:baseline-arrow-back-ios-new" />
      <p>kembali</p>
    </RouterLink>
  </section>
</template>
