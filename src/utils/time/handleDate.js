import { daysIndonesian } from "./getDay"
import { monthsIndonesian } from "./getMonth"

const padTo2Digits = (num) => {
  return num.toString().padStart(2, "0")
}

const date = new Date()
const month = monthsIndonesian[date.getMonth()]
const day = daysIndonesian[date.getDay()]
const year = date.getFullYear()

const dateToday = `${day} ${date.getDate()} ${month} ${year}`
const dateForQuery = `${year}-${padTo2Digits(
  date.getMonth() + 1
)}-${padTo2Digits(date.getDate())}`
const dateYesterday = `${year}-${date.getMonth() + 1}-${date.getDate() - 1}`

export { dateToday, dateForQuery, dateYesterday }
