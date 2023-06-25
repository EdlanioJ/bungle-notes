import { getServerAuthSession } from '@/server/auth'
import { redirect } from 'next/navigation'

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerAuthSession()

  if (!session) redirect('/login')

  return <main>{children}</main>
}
