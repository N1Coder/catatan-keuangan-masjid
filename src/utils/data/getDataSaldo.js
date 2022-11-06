import { supabase } from "../../global/supabase"
import { dataNotif } from "./dataForNotif"

export const getSaldo = async (table, query, col, dataVal, time) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .select(query)
      .eq(col, time)

    console.log(data)

    if (error) throw error

    const [saldoNum] = data

    dataVal.value = Number(saldoNum.jumlah_saldo)
  } catch (err) {
    console.log(err.message)
  }
}