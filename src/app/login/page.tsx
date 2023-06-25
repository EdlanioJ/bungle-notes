import { redirect } from 'next/navigation'
import { Logo } from '@/components/Logo'
import { SignIn } from '@/components/SignIn'
import { getServerAuthSession } from '@/server/auth'

export const metadata = {
  title: 'Login',
}

export default async function Login() {
  const session = await getServerAuthSession()

  if (session) redirect('/')

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 bg-violet-600">
      <Logo width={72} height={76} />
      <SignIn />
    </div>
  )
}
