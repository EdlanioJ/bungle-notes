export const months = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
]

export class DateFormatter {
  static format(date: Date) {
    const dateToCheck = new Date()

    if (
      dateToCheck.getFullYear() === date.getFullYear() &&
      dateToCheck.getMonth() === date.getMonth() &&
      dateToCheck.getDate() === date.getDate()
    ) {
      return 'Hoje'
    }

    dateToCheck.setDate(dateToCheck.getDate() + 1)

    if (
      dateToCheck.getFullYear() === date.getFullYear() &&
      dateToCheck.getMonth() === date.getMonth() &&
      dateToCheck.getDate() === date.getDate()
    ) {
      return 'Amanhã'
    }

    const month = months[date.getMonth()] ?? ''
    return `${date.getDate()}, ${month} de ${date.getFullYear()}`
  }
}
