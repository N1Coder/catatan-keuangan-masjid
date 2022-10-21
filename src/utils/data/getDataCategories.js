import { supabase } from "../../global/supabase"
import { dateForQuery } from "../time/handleDate"
import { dataNotif } from "./dataForNotif"

export const getDataCategories = async (
  table,
  query,
  foreignTable,
  foreignKey,
  dataArr,
  colDate
) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .select(
        `
      ${query},
      ${foreignTable} (
        ${foreignKey}
      )
    `
      )
      .eq(colDate, dateForQuery)

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
