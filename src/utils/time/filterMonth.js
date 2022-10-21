export const getMonthDates = () => {
  const date = new Date()
  const start = new Date(date.getFullYear(), date.getMonth(), 1)
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0)

  const startMonth = `${start.getFullYear()}-${
    start.getMonth() + 1
  }-${start.getDate()}`
  const endMonth = `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`

  return [startMonth, endMonth]
}
