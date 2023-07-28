import { Pencil } from 'lucide-react'
import { SearchFilter } from '@/components/SearchFilter'
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
    <div className="space-y-8 px-10 py-12">
      <h1 className="flex items-center gap-3 text-center text-xl font-bold text-zinc-800 xl:text-3xl">
        Meus Bungles do dia
        <Pencil className="text-zinc-400" />
      </h1>
      <SearchFilter />
      <FeedBoard />
    </div>
  )
}
