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
      return 'Para hoje'
    }

    dateToCheck.setDate(dateToCheck.getDate() + 1)

    if (
      dateToCheck.getFullYear() === date.getFullYear() &&
      dateToCheck.getMonth() === date.getMonth() &&
      dateToCheck.getDate() === date.getDate()
    ) {
      return 'Para amanhã'
    }

    const month = months[date.getMonth()] ?? ''
    return `Para ${date.getDate()}, ${month} de ${date.getFullYear()}`
  }
}
