import { createTRPCRouter } from '@/server/api/trpc'

import { taskRouter } from '@/server/api/routers/task'
import { projectRouter } from '@/server/api/routers/project'
import { statsRouter } from '@/server/api/routers/stats'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  task: taskRouter,
  project: projectRouter,
  stats: statsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
