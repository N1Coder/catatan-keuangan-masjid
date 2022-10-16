import { supabase } from "../../global/supabase"

export const getCategories = async (table, data) => {
  try {
    const { data: kategori_pemasukan, error } = await supabase
      .from(table)
      .select("*")

    data.value = kategori_pemasukan
    console.log(data.value)
  } catch (err) {
    console.log(err.message)
  }
}
