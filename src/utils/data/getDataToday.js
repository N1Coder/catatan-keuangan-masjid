import { supabase } from "../../global/supabase"
import { dataNotif } from "../data/dataForNotif"
import { dateForQuery } from "../time/handleDate"

export const getDataToday = async (table, query, col, dataArr) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .select(query)
      .eq(col, dateForQuery)

    console.log(data)

    dataArr.value = data
  } catch (err) {
    dataNotif.value.push({
      id: Math.trunc(Math.random() * 100),
      success: false,
      message: err.message,
    })
  }
}
