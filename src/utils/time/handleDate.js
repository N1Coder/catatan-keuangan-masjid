import { daysIndonesian } from "./getDay"
import { monthsIndonesian } from "./getMonth"

const date = new Date()
const month = monthsIndonesian[date.getMonth()]
const day = daysIndonesian[date.getDay()]
const year = date.getFullYear()

export const dateToday = `${day} ${date.getDate()} ${month} ${year}`
