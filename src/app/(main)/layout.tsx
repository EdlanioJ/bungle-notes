import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { RightSection } from '@/components/RightSection'
import { Sidebar } from '@/components/Sidebar'
import { CreateTaskModal } from '@/components/CreateTaskModal'
import { DefaultCreateTask } from '@/components/DefaultCreateTask'
import { getServerAuthSession } from '@/server/auth'

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
    <>
      <div className="grid h-screen w-full grid-cols-1 gap-5 overflow-y-scroll bg-zinc-100 antialiased md:grid-cols-[6rem_1fr_16rem] md:px-5 lg:grid-cols-[12rem_1fr_18rem]">
        <Sidebar />
        <main className="mx-auto mt-20 w-11/12 md:mt-5 md:max-w-full">
          {children}
        </main>
        <RightSection user={session.user} />
      </div>
      <DefaultCreateTask />
      <CreateTaskModal />
    </>
  )
}
