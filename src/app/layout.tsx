import '@/styles/globals.css'
import { Inter, Fira_Code } from 'next/font/google'
import { type Metadata } from 'next'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-inter',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-code',
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
    <html lang="pt" className={`${inter.variable} ${firaCode.variable}`}>
      <body className="overflow-hidden bg-zinc-100 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
