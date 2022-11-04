import { daysIndonesian } from "./getDay"
import { monthsIndonesian } from "./getMonth"

const date = new Date()
const month = monthsIndonesian[date.getMonth()]
const day = daysIndonesian[date.getDay()]
const year = date.getFullYear()

const dateToday = `${day} ${date.getDate()} ${month} ${year}`
const dateForQuery = `${year}-${date.getMonth() + 1}-${date.getDate()}`
const dateYesterday = `${year}-${date.getMonth() + 1}-${date.getDate() - 1}`

export { dateToday, dateForQuery, dateYesterday }
