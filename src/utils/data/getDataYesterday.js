import { supabase } from "../../global/supabase"
import { dateYesterday } from "../time/handleDate"
import { dataNotif } from "./dataForNotif"

export const getSaldoYesterday = async (table, query, col, dataVal) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .select(query)
      .eq(col, dateYesterday)

    console.log(data)

    if (error) throw error

    const [saldoNum] = data

    dataVal.value = Number(saldoNum.jumlah_saldo)
  } catch (err) {
    dataNotif.value.push({
      id: Math.trunc(Math.random() * 100),
      success: false,
      message: err.message,
    })
  }
}
