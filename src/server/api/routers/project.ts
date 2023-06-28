import { createTRPCRouter, protectedProcedure } from '../trpc'

export const projectRouter = createTRPCRouter({
  getUserProjects: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id
    const projects = await ctx.prisma.project.findMany({
      where: { deletedAt: null, userId },
      select: { id: true, name: true },
    })

    return projects
  }),
})
