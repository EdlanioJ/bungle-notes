import { Pencil } from 'lucide-react'
import { Board } from '@/components/Board'
import { SearchFilter } from '@/components/SearchFilter'
import { getServerAuthSession } from '@/server/auth'

export async function generateMetadata() {
  const session = await getServerAuthSession()

  return { title: session?.user.name }
}

export default function Home() {
  return (
    <div className="space-y-8 px-10 py-12">
      <h1 className="flex items-center gap-3 text-center text-xl font-bold text-zinc-800 xl:text-3xl">
        Meus Bungles do dia
        <Pencil className="text-zinc-400" />
      </h1>

      <SearchFilter />
      <Board />
    </div>
  )
}
