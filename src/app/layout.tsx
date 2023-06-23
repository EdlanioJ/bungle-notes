import '@/styles/globals.css'

import { type Metadata } from 'next'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: {
    default: 'Bungles',
    template: '%s | Bungles',
  },
  description: 'Organize seus Bungles',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className="overflow-hidden bg-[#7c3aed]">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
