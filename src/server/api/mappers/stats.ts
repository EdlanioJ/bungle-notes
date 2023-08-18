import { Prisma } from '@prisma/client'

namespace WeeklyTaskCountMapper {
  export type Params = Prisma.PickEnumerable<
    Prisma.TaskGroupByOutputType,
    'createdAt'[]
  >[]

  export type Result = { label: string; count: number; date: Date }[]
}

export class WeeklyTaskCountMapper {
  private static daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

  public static map(
    stats: WeeklyTaskCountMapper.Params,
  ): WeeklyTaskCountMapper.Result {
    const startDate = new Date()

    const dayCounts: { [day: string]: number } = {}
    WeeklyTaskCountMapper.daysOfWeek.forEach((day) => {
      dayCounts[day] = 0
    })

    stats.forEach((task) => {
      const taskDayIndex = task.createdAt.getDay()
      const taskDay = WeeklyTaskCountMapper.daysOfWeek[taskDayIndex] as string
      dayCounts[taskDay]++
    })

    const result: WeeklyTaskCountMapper.Result = Array(7)
      .fill(null)
      .map((_, index) => {
        const date = new Date(startDate)
        date.setDate(startDate.getDate() - (6 - index))
        date.setHours(0, 0, 0, 0)

        const dayIndex = date.getDay()
        const label = WeeklyTaskCountMapper.daysOfWeek[dayIndex] as string
        const count = dayCounts[label] as number

        return { label, count, date }
      })

    result.sort((a, b) => a.date.getTime() - b.date.getTime())
    return result
  }
}
