import superjson from 'superjson'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { appRouter } from '../api/root'
import { createTRPCContext } from '../api/trpc'

export async function ssgHelper() {
  return createServerSideHelpers({
    router: appRouter,
    ctx: await createTRPCContext(),
    transformer: superjson,
  })
}
