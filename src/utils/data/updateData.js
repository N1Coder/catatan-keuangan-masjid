import { supabase } from "../../global/supabase"
import { dataNotif } from "./dataForNotif"

export const updateData = async (table, value, query, queryVal) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .update(value)
      .eq(`${query}`, `${queryVal}`)

    if (error) throw error

    console.log(data)
  } catch (err) {
    console.log(err.message)
    dataNotif.value.push({
      id: Math.trunc(Math.random() * 100),
      success: false,
      message: err.message,
    })
  }
}
