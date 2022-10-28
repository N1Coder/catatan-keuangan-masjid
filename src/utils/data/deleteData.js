import { supabase } from "../../global/supabase"
import { dataNotif } from "./dataForNotif"

export const deleteData = async (table, query, queryVal, dataArr, indexArr) => {
  // try {
  //   const { data, error } = await supabase
  //     .from(table)
  //     .delete()
  //     .eq(`${query}`, `${queryVal}`)

  //   if (error) throw error

  //   dataArr.splice(indexArr, 1)

  //   dataNotif.value.push({
  //     id: Math.trunc(Math.random() * 100),
  //     success: true,
  //     message: "data berhasil dihapus",
  //   })
  //   console.log(data)
  // } catch (err) {
  //   console.log(err.message)
  //   dataNotif.value.push({
  //     id: Math.trunc(Math.random() * 100),
  //     success: false,
  //     message: err.message,
  //   })
  // }
  dataArr.splice(indexArr, 1)
}
