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

export const getLastMonthDates = () => {
  const d = new Date()
  // const to = d.setTime(
  //   d.getTime() - (d.getDay() ? d.getDay() : 30) * 24 * 60 * 60 * 1000
  // )
  // const from = d.setTime(d.getTime() - 6 * 24 * 60 * 60 * 1000)
  const currentYear = d.getFullYear()
  const currentMonth = d.getMonth()

  const lastDayOfMonth = new Date(currentYear, currentMonth, 0)

  return lastDayOfMonth
}
