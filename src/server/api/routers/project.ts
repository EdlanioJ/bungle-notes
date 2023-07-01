/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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

  getUserGithubRepos: protectedProcedure.query(async ({ ctx }) => {
    const username = ctx.session.user.username
    const res = await fetch(`https://api.github.com/users/${username}/repos`)
    if (!res.ok)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
      })

    const jsonRes = await res.json()
    const repoSchema = z.object({
      name: z.string(),
      description: z.string().nullable(),
      language: z.string().nullable(),
      id: z.number(),
    })
    const responseSchema = z.array(repoSchema)
    const parsedRepos = responseSchema.parse(jsonRes)

    return parsedRepos.map((repo) => {
      const formattedName = repo.name
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')

      return {
        ...repo,
        name: formattedName,
        slug: repo.name,
      }
    })
  }),
})
