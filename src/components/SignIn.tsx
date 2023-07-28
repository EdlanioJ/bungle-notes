/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { LucideGithub } from 'lucide-react'
import { signIn } from 'next-auth/react'

export function SignIn() {
  const handleSignIn = async () => {
    await signIn('github', {
      redirect: true,
    })
  }
  return (
    <div className=" rounded-lg bg-zinc-50 p-4 shadow-2xl">
      <h1 className="mb-6 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        Olá, Bem-Vindo
      </h1>
      <p className="pb-3 text-sm font-medium text-gray-400">
        Entre e organize seus
        <span className="text-violet-600"> Bungles</span>
      </p>

      <button
        type="button"
        onClick={handleSignIn}
        className="flex w-64  items-center justify-center gap-2 rounded-lg bg-violet-600 py-3 text-zinc-50 transition-colors hover:bg-violet-500"
      >
        <LucideGithub />
        Entrar com Github
      </button>
    </div>
  )
}
