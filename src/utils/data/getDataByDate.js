import { supabase } from "../../global/supabase"

export const getDataByDate = async (
  table,
  query,
  dataArr,
  col,
  startDate,
  endDate
) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .select(query)
      .gte(col, startDate)
      .lte(col, endDate)

    if (error) throw error

    console.log(data)
    dataArr.value = data
  } catch (err) {
    console.log(err.message)
  }
}
