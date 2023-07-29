import clsx from 'clsx'
import type { Icon as LucidIcon } from 'lucide-react'

type Props = {
  icon: LucidIcon
  text: string
  selected?: boolean
}
export function NavItem({ icon: Icon, text }: Props) {
  return (
    <div
      className={clsx(
        'group relative ml-8 flex h-14 items-center gap-4 text-zinc-600 transition-all',
      )}
    >
      <Icon
        size={24}
        className="transition-all duration-300 group-hover:ml-2"
      />
      <span className="inline text-sm font-medium md:hidden lg:inline">
        {text}
      </span>
    </div>
  )
}
