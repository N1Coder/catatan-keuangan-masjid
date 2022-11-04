import { supabase } from "../../global/supabase"

export const upsertData = async (table, dataInput) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .upsert(dataInput, { onConflict: "waktu" })

    console.log("data berhasil ditambahkan", dataInput)
    console.log(data)

    if (error) throw error
  } catch (err) {
    console.log(err.message)
  }
}
