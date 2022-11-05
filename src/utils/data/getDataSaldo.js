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
    dataNotif.value.push({
      id: Math.trunc(Math.random() * 100),
      success: false,
      message: err.message,
    })
  }
}
