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
  const session = await getServerAuthSession()

  if (!session)
    redirect(`/signin?callbackUrl=${headerList.get('x-pathname') ?? '/'}`)

  return (
    <div className="grid h-screen w-full grid-cols-1 gap-5 overflow-y-scroll bg-zinc-100 antialiased md:grid-cols-[6rem_1fr_16rem] md:px-5 lg:grid-cols-[12rem_1fr_18rem]">
      <Sidebar />
      <main className="scrollbar h-screen overflow-y-scroll bg-zinc-100">
        <Header user={session.user} />
        {children}
      </main>

      <DefaultCreateTask />
      <CreateTaskModal />
    </div>
  )
}
