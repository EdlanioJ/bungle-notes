import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { TaskMapper } from '@/server/api/mappers/task'

export const taskRouter = createTRPCRouter({
  getUserTasks: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id
    const tasks = await ctx.prisma.task.findMany({
      where: { userId, deletedAt: null },
      include: { project: { select: { name: true } } },
    })

    return TaskMapper.mapCollection(tasks)
  }),
})
