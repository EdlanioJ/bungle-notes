import { Metadata } from 'next'
import { getServerAuthSession } from '@/server/auth'
import { FeedBoard } from '@/components/FeedBoard'
import { Heading } from '@/components/Heading'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const session = await getServerAuthSession()
  return {
    title: session?.user.name,
  }
}

export default async function Home() {
  return (
    <div className="flex h-full w-full flex-col gap-6 md:pb-6">
      <Heading>Board</Heading>
      <FeedBoard />
    </div>
  )
}
