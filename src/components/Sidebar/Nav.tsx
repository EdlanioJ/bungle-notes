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

export function Nav() {
  const pathname = usePathname()

  return (
    <nav className="relative top-6 flex h-[92vh] flex-col rounded-xl bg-white transition-all duration-300 hover:shadow-none md:h-[86vh] md:shadow-2xl">
      <Link href="/">
        <NavItem
          icon={LayoutDashboard}
          text="Boards"
          selected={pathname === '/'}
        />
      </Link>
      <Link href="/projects">
        <NavItem
          icon={FolderKanban}
          text="Projetos"
          selected={pathname === '/projects'}
        />
      </Link>
      <Link href="/">
        <NavItem icon={LineChart} text="Relatórios" />
      </Link>
      <Link href="/">
        <NavItem icon={Cog} text="Ajustes" />
      </Link>
      <button className="absolute bottom-8 ml-8 flex h-14 w-full items-center gap-4 text-zinc-600 transition-all">
        <LogOut size={24} className=" transition-all duration-300" />
        <h3 className="inline text-sm font-medium md:hidden lg:inline">
          Logout
        </h3>
      </button>
    </nav>
  )
}
