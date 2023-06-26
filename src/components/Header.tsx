import Image from 'next/image'
import type { Session } from 'next-auth'

type Props = {
  user: Session['user']
}

export function Header({ user }: Props) {
  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between px-10 pb-2 pt-4 ">
      <div />

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
