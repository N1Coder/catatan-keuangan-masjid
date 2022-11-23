import { supabase } from "../../global/supabase"
import { dataNotif } from "./dataForNotif"

export const getDataCategoriesByDate = async (
  table,
  query,
  foreignTable,
  foreignKey,
  dataArr,
  col,
  startDate,
  endDate
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
      .gte(col, startDate)
      .lte(col, endDate)

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
