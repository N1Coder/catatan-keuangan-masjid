import { supabase } from "../../global/supabase"
import { dataNotif } from "../data/dataForNotif"

export const getAllData = async (table, dataArr) => {
  try {
    const { data, error } = await supabase.from(table).select("*")

    if (error) throw error

    dataArr.value = data
    console.log(data)
  } catch (err) {
    dataNotif.value.push({
      id: Math.trunc(Math.random() * 100),
      success: false,
      message: err.message,
    })
  }
}
