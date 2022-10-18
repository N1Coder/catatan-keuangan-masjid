export const getWeekDates = () => {
  const now = new Date()
  const dayOfWeek = now.getDay() //0-6
  const numDay = now.getDate()

  const start = new Date(now) //copy
  start.setDate(numDay - dayOfWeek)
  start.setHours(0, 0, 0, 0)

  const end = new Date(now) //copy
  end.setDate(numDay + (6 - dayOfWeek))
  end.setHours(0, 0, 0, 0)

  const formatStart = ``

  return [start, end]
}
