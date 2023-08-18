import { WeeklyTaskCountMapper } from '../mappers/stats'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const statsRouter = createTRPCRouter({
  projectAndTaskStatusCount: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id
    const [projectCount, taskStatusCountRes] = await Promise.all([
      ctx.prisma.project.count({ where: { deletedAt: null, userId } }),
      ctx.prisma.task.groupBy({
        by: ['status'],
        where: { deletedAt: null, userId },
        _count: { status: true },
        orderBy: { _count: { status: 'desc' } },
      }),
    ])

    const taskStatusCount: StatusCount = taskStatusCountRes.reduce(
      (acc, value) => ({ ...acc, [value.status]: value._count.status }),
      { done: 0, inProgress: 0, todo: 0 },
    )
    return { projectCount, taskStatusCount }
  }),

  weeklyTaskCount: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6)
    sevenDaysAgo.setHours(0, 0, 0, 0)

    const stats = await ctx.prisma.task.groupBy({
      by: ['createdAt'],
      where: {
        deletedAt: null,
        userId,
      },

      having: {
        createdAt: { gte: new Date(sevenDaysAgo) },
      },
    })

    return WeeklyTaskCountMapper.map(stats)
  }),
})
