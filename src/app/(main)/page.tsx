import { getServerAuthSession } from '@/server/auth'
import { FeedBoard } from '@/components/FeedBoard'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const session = await getServerAuthSession()
  return {
    title: session?.user.name,
  }
}

export default async function Home() {
  return (
    <div className="flex h-full w-full flex-col gap-6">
      <h1 className="text-xl font-bold text-zinc-800">Board</h1>
      <FeedBoard />
    </div>
  )
}
