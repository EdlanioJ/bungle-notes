'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Smartphone, Folder, File, Settings } from 'lucide-react'

import { NavItem } from './NavItem'

export function Nav() {
  const pathname = usePathname()

  return (
    <nav>
      <ul className="mt-14 flex flex-col gap-2 md:w-28 md:gap-6">
        <li>
          <Link href="/">
            <NavItem
              icon={Smartphone}
              text="Boards"
              selected={pathname === '/'}
            />
          </Link>
        </li>
        <li>
          <Link href="/">
            <NavItem icon={Folder} text="Projetos" />
          </Link>
        </li>
        <li>
          <Link href="/">
            <NavItem icon={File} text="Relatórios" />
          </Link>
        </li>
        <li>
          <Link href="/">
            <NavItem icon={Settings} text="Ajustes" />
          </Link>
        </li>
      </ul>
    </nav>
  )
}
