import { supabase } from "../../global/supabase"

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

export const getFirstSaldo = async (table, query, dataVal) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .select(query)
      .eq("id_saldo", 60)

    console.log(data)

    if (error) throw error

    const [saldoNum] = data

    dataVal.value = Number(saldoNum.jumlah_saldo)
  } catch (err) {
    console.log(err.message)
  }
}
