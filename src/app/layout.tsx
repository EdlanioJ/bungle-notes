import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { type Metadata } from 'next'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Bungles',
    template: '%s | Bungles',
  },
  description: 'Organize seus Bungles',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={`${inter.variable}`}>
      <body className="overflow-hidden bg-zinc-100 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
