'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LogOut,
  LayoutDashboard,
  FolderKanban,
  Cog,
  LineChart,
} from 'lucide-react'

import { NavItem } from './NavItem'
import { signOut } from 'next-auth/react'

export function Nav() {
  const pathname = usePathname()
  async function handleSignOut() {
    await signOut()
  }

  return (
    <nav className="relative top-6 flex h-[92vh] flex-col overflow-hidden bg-white transition-all duration-300 hover:shadow-none md:h-[86vh] md:rounded-xl md:shadow-2xl">
      <Link href="/">
        <NavItem
          icon={LayoutDashboard}
          text="Boards"
          active={pathname === '/'}
        />
      </Link>
      <Link href="/projects">
        <NavItem
          icon={FolderKanban}
          text="Projetos"
          active={pathname === '/projects'}
        />
      </Link>
      <Link href="/analytics">
        <NavItem
          icon={LineChart}
          text="Relatórios"
          active={pathname === '/analytics'}
        />
      </Link>
      <Link href="/">
        <NavItem icon={Cog} text="Ajustes" />
      </Link>
      <button
        onClick={handleSignOut}
        className="absolute bottom-8 ml-8 flex h-14 w-full items-center gap-4 text-zinc-600 transition-all"
      >
        <LogOut size={24} className=" transition-all duration-300" />
        <h3 className="inline text-sm font-medium md:hidden lg:inline">
          Logout
        </h3>
      </button>
    </nav>
  )
}
