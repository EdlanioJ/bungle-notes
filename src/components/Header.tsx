'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import type { Session } from 'next-auth'
import { Pencil } from 'lucide-react'
import clsx from 'clsx'
import { useProjectStore } from '@/store/project'

type Props = {
  user: Session['user']
}

export function Header({ user }: Props) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showText, setShowText] = useState(false)
  const pathname = usePathname()
  const project = useProjectStore((store) => store.project)

  useEffect(() => {
    const onScroll = (event: Event) => {
      const main = event.target as HTMLElement
      if (main.tagName.toLowerCase() === 'main') {
        setIsScrolled(main.scrollTop > 0)
        setShowText(main.scrollTop > 100)
      }
    }

    window.addEventListener('scroll', onScroll, true)

    return () => {
      window.removeEventListener('scroll', onScroll, true)
    }
  }, [])

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 flex w-full items-center justify-between px-10 pb-2 pt-4 ',
        { 'bg-white  shadow-custom': isScrolled },
      )}
    >
      <div>
        {pathname === '/' && showText && (
          <h1 className="flex items-center justify-center gap-3 truncate text-center text-xl font-bold text-zinc-800 xl:text-2xl">
            Meus Bungles do dia
            <Pencil className="text-zinc-400" />
          </h1>
        )}

        {pathname.includes('/projects/') && showText && project !== null && (
          <h1 className="flex items-center justify-center gap-2 truncate text-center font-bold text-zinc-700 xl:text-2xl">
            Projeto {project.name}
          </h1>
        )}
      </div>

      <div className="group relative">
        <div className="relative h-11 w-11 overflow-hidden rounded-full border-4">
          <Image
            className="rounded-full object-cover"
            alt={`${user.name} Profile picture`}
            src={user.image}
            fill
            sizes="(min-width: 2.75rem) 100vw"
          />
        </div>

        <span className="invisible absolute left-1/2 mt-2 -translate-x-1/2 truncate rounded-lg bg-white px-2 py-1 text-xs font-semibold text-zinc-800 shadow-custom transition-all group-hover:visible">
          {user.name}
        </span>
      </div>
    </header>
  )
}
