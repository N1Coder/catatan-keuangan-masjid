<script setup>
import { Icon } from "@iconify/vue"
import { onMounted, ref } from "vue"
import { currency } from "../utils/currency"
import { dateForQuery } from "../utils/time/handleDate"
import { insertData } from "../utils/useActions"
import { getCategories } from "../utils/useData"

const categoriesPemasukan = ref([])

const nameInput = ref(""),
  incomeInput = ref(""),
  dateInput = ref(dateForQuery),
  categoriesInput = ref(null)

onMounted(async () => {
  await getCategories("kategori_pemasukan", categoriesPemasukan)
})

const addPemasukan = async () => {
  if (incomeInput.value === 0) {
    return alert("Tolong isi jumlah transaksi")
  }

  try {
    const newPemasukan = await insertData("pemasukan", {
      kategori_pemasukan: categoriesInput.value,
      nama_pemasukan: nameInput.value,
      jumlah: incomeInput.value,
      tanggal_pemasukan: dateInput.value,
    })

    if (!newPemasukan) {
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
  <section class="p-dekstop lg:pr-[45vw]">
    <h1
      class="capitalize text-3xl text-orange-500 dark:text-slate-100 font-bold"
    >
      tambah pemasukan
    </h1>

    <form
      class="flex flex-col gap-4 mt-6 py-9 p-7 bg-white dark:bg-slate-900 shadow-sharp-lg border-[3px] border-black"
      @submit.prevent="addPemasukan"
    >
      <label>
        <p
          class="capitalize text-lg text-orange-500 dark:text-slate-200 font-medium"
        >
          tanggal pemasukan
        </p>
        <input class="input-primary" v-model="dateInput" type="date" required />
      </label>

      <label>
        <p
          class="capitalize text-lg text-orange-500 dark:text-slate-200 font-medium"
        >
          kategori pemasukan
        </p>

        <select class="input-primary py-1" v-model="categoriesInput">
          <option
            v-for="(category, i) in categoriesPemasukan"
            :key="i"
            :value="category.id_kategori"
          >
            {{ category.nama_kategori }}
          </option>
        </select>
      </label>

      <label>
        <p
          class="capitalize text-lg text-orange-500 dark:text-slate-200 font-medium"
        >
          nama pemasukan
        </p>
        <input
          class="input-primary"
          v-model="nameInput"
          type="text"
          minlength="3"
          placeholder="Masukkan nama pemasukan"
          required
        />
      </label>

      <label>
        <p
          class="capitalize text-lg text-orange-500 dark:text-slate-200 font-medium"
        >
          jumlah pemasukan
        </p>
        <input
          class="input-primary pr-1"
          v-model="incomeInput"
          type="number"
          min="100"
          placeholder="Masukkan jumlah pemasukan"
          required
        />

        <p
          class="capitalize text-lg text-orange-500 dark:text-slate-200 font-medium"
        >
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
