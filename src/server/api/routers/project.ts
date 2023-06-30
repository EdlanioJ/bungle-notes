import { TRPCError } from '@trpc/server'
import { ProjectMapper } from '../mappers/project'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { z } from 'zod'

export const projectRouter = createTRPCRouter({
  getUserProjects: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id
    const projects = await ctx.prisma.project.findMany({
      where: { deletedAt: null, userId },
      select: { id: true, name: true },
    })

    return projects
  }),

  getUserFullProjects: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id
    const projects = await ctx.prisma.project.findMany({
      where: {
        userId,
        deletedAt: null,
      },
    })

    const statusCountQueries = projects.map((project) =>
      ctx.prisma.task.groupBy({
        by: ['status', 'projectId'],
        where: { projectId: project.id, deletedAt: null },
        _count: {
          status: true,
        },
        orderBy: {
          _count: {
            status: 'desc',
          },
        },
      }),
    )

    const statusesCount = await Promise.all(statusCountQueries)

    return ProjectMapper.mapCollection(projects, statusesCount)
  }),

  getProject: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id
      const project = await ctx.prisma.project.findFirst({
        where: { id: input.id, userId, deletedAt: null },
      })
      if (!project)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Project not found',
        })

      const taskStatusCount = await ctx.prisma.task.groupBy({
        by: ['status', 'projectId'],
        _count: {
          status: true,
        },
        where: { projectId: project.id, deletedAt: null },
      })

      return ProjectMapper.map(project, taskStatusCount)
    }),
})
