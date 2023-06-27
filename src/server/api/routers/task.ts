import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { TaskMapper } from '@/server/api/mappers/task'
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'

export const taskRouter = createTRPCRouter({
  getUserTasks: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id
    const tasks = await ctx.prisma.task.findMany({
      where: { userId, deletedAt: null },
      include: { project: { select: { name: true } } },
    })

    return TaskMapper.mapCollection(tasks)
  }),

  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.string().nonempty(),
        status: z.enum(['todo', 'inProgress', 'done']),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id
      const task = await ctx.prisma.task.findFirst({
        where: { id: input.id, userId, deletedAt: null },
        select: { id: true },
      })

      if (!task)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Task not found',
        })

      await ctx.prisma.task.update({
        data: { status: input.status },
        where: { id: task.id },
        select: { id: true },
      })
    }),
})
