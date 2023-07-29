import { redirect } from 'next/navigation'
import { SignInButton } from '@/components/SignInButton'
import { getServerAuthSession } from '@/server/auth'

export const metadata = {
  title: 'Sign in',
}

export default async function SignIn() {
  const session = await getServerAuthSession()

  if (session) redirect('/')

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 bg-zinc-100">
      <div className="flex flex-col gap-3 rounded-lg bg-white px-4 py-8 shadow-xl">
        <span className="mb-2 self-center font-code text-2xl font-bold leading-none text-zinc-600">
          {'<'}
          <span className="text-pink-600">KANBAN</span>4
          <span className="text-teal-600">DEV</span>
          {' />'}
        </span>
        <h1 className="text-xl font-bold">Sign in</h1>
        <p className="text-zinc-500">to continue to Kanban4Dev</p>
        <SignInButton />
      </div>
    </div>
  )
}
