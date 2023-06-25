import { Board } from '@/components/Board'
import { getServerAuthSession } from '@/server/auth'

export async function generateMetadata() {
  const session = await getServerAuthSession()

  return { title: session?.user.name }
}

export default function Home() {
  return (
    <div className="space-y-8 px-10 py-12">
      <h1 className="text-2xl font-bold leading-tight">Home</h1>
      <Board />
    </div>
  )
}
