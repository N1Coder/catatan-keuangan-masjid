import { supabase } from "../../global/supabase"
import { dataNotif } from "../data/dataForNotif"

export const insertData = async (table, dataInput) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .insert(dataInput)
      .single()

    console.log("data berhasil ditambahkan", dataInput)
    console.log(data)

    if (error) throw error

    dataNotif.value.push({
      id: Math.trunc(Math.random() * 100),
      success: true,
      message: "data berhasil ditambahkan",
    })
    console.log(dataNotif.value)
  } catch (err) {
    console.log(err.message)
    dataNotif.value.push({
      id: Math.trunc(Math.random() * 100),
      success: false,
      message: err.message,
    })
  }
}
