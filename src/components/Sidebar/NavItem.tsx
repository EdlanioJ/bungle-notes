import clsx from 'clsx'
import type { Icon as LucidIcon } from 'lucide-react'

type Props = {
  icon: LucidIcon
  text: string
  selected?: boolean
}
export function NavItem({ icon: Icon, text, selected = false }: Props) {
  return (
    <div
      className={clsx(
        'group flex h-9 w-9 items-center justify-center rounded-md md:h-auto md:w-auto md:justify-normal md:gap-4 md:rounded-none md:bg-transparent',
        {
          'bg-black/20 font-bold text-white': selected,
          'hover:bg-black/20 md:hover:bg-transparent': !selected,
        },
      )}
    >
      <Icon className="md:font-bold" />
      <span className="hidden md:inline-block">{text}</span>
    </div>
  )
}
