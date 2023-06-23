'use client'

import { ApiProvider } from '@/utils/api'
import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApiProvider>
      <SessionProvider>{children}</SessionProvider>
    </ApiProvider>
  )
}
