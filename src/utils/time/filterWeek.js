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

  const startWeek = `${start.getFullYear()}-${
    start.getMonth() + 1
  }-${start.getDate()}`
  const endWeek = `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`

  return [startWeek, endWeek]
}

export const getLastWeekDates = () => {
  const d = new Date()
  const to = d.setTime(
    d.getTime() - (d.getDay() ? d.getDay() : 7) * 24 * 60 * 60 * 1000
  )
  const from = d.setTime(d.getTime() - 6 * 24 * 60 * 60 * 1000)

  return [to, from]
}

// saved for later
// const getWeekDates = (inputDate) => {
//   const now = new Date(inputDate)
//   const dayOfWeek = now.getDay() //0-6
//   const numDay = now.getDate()

//   const start = new Date(now) //copy
//   start.setDate(numDay - dayOfWeek)
//   start.setHours(0, 0, 0, 0)

//   const end = new Date(now) //copy
//   end.setDate(numDay + (6 - dayOfWeek))
//   end.setHours(0, 0, 0, 0)

//   const startWeek = `${start.getFullYear()}-${
//     start.getMonth() + 1
//   }-${start.getDate()}`
//   const endWeek = `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`

//   return [startWeek, endWeek]
// }

// onMounted(() => {
//   const [start, end] = getWeekDates("2022-10-7")

//   console.log(start, end)
// })
