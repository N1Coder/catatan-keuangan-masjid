export const getYearDates = () => {
  const date = new Date()
  const start = new Date(date.getFullYear(), 0, 1)
  const end = new Date(date.getFullYear(), 11, 31)

  const startYear = `${start.getFullYear()}-${
    start.getMonth() + 1
  }-${start.getDate()}`
  const endYear = `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`

  return [startYear, endYear]
}
