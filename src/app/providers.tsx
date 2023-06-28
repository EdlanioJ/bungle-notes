'use client'

import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import { ApiProvider } from '@/utils/api'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApiProvider>
      <SessionProvider>{children}</SessionProvider>
      <Toaster position="top-right" reverseOrder={false} />
    </ApiProvider>
  )
}
