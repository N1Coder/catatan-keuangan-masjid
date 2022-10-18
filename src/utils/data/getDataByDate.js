export const getDataByDate = async (table, query, filterBy) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .select(query)
      .containedBy(filterBy)
  } catch (err) {
    console.log(err.message)
  }
}
