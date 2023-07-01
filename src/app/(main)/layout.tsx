import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { getServerAuthSession } from '@/server/auth'
import { CreateTaskModal } from '@/components/CreateTaskModal'
import { DefaultCreateTask } from '@/components/DefaultCreateTask'

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headerList = headers()
  console.log({ headerList })
  const session = await getServerAuthSession()

  if (!session)
    redirect(`/login?callbackUrl=${headerList.get('x-pathname') ?? '/'}`)

  return (
    <div className="grid min-h-screen grid-cols-body">
      <Sidebar />
      <main className="h-screen overflow-y-scroll bg-zinc-100">
        <Header user={session.user} />
        {children}
      </main>

      <DefaultCreateTask />
      <CreateTaskModal />
    </div>
  )
}
