import { supabase } from "../../global/supabase"
import { dataNotif } from "./dataForNotif"

export const getAllCategoriesData = async (
  table,
  query,
  foreignTable,
  foreignKey,
  dataArr
) => {
  try {
    const { data, error } = await supabase.from(table).select(
      `
      ${query},
      ${foreignTable} (
        ${foreignKey}
      )
    `
    )

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
