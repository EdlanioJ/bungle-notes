'use client'

import { signIn } from 'next-auth/react'
import { Github } from './icons'

export function SignInButton() {
  const handleSignIn = async () => {
    await signIn('github', {
      redirect: true,
    })
  }

  return (
    <button
      type="button"
      onClick={handleSignIn}
      className="flex h-11 w-64 items-center justify-center gap-2 rounded-lg border-2 border-zinc-200 bg-white font-medium text-zinc-700 transition-colors duration-300 hover:bg-zinc-100"
    >
      <Github />
      Entrar com Github
    </button>
  )
}
