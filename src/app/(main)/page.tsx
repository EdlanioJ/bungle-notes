import { getServerAuthSession } from '@/server/auth'

export async function generateMetadata() {
  const session = await getServerAuthSession()

  return { title: session?.user.name }
}

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Home</h1>
    </div>
  )
}
